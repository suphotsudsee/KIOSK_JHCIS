import { useEffect, useState } from 'react'
import cardImage from './assets/react.svg'
import printerIcon from './assets/printer.svg'
import ThaiIDCard from './components/ThaiIDCard'
import './App.css'

export default function App() {
  const [now, setNow] = useState(new Date())
  const [hospital, setHospital] = useState(null)
  const [dbError, setDbError] = useState(false)
  const [cardInfo, setCardInfo] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)

    fetch('http://localhost:3001/jhcis/api/v1/hospital')
      .then((res) => res.json())
      .then((result) => {
        if (result.ok && result.data) {
          setHospital(result.data)
        } else {
          setDbError(true)
        }
      })
      .catch(() => setDbError(true))

    return () => clearInterval(timer)
  }, [])

  const weekday = now.toLocaleDateString('th-TH', { weekday: 'long' })
  const dateStr = now.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('th-TH')

  const address = hospital
    ? `หมู่ ${hospital.mu} ตำบล${hospital.subdistname} อำเภอ${hospital.distname} จังหวัด${hospital.provname}`
    : ''

  const handleConfirm = () => {
    fetch('http://localhost:3001/jhcis/api/v1/read')
      .then((res) => res.json())
      .then((result) => {
        if (result.ok && result.data) {
          setCardInfo(result.data)
        } else {
          setCardInfo(null)
          alert(result.message || 'ไม่สามารถอ่านข้อมูลบัตรได้')
        }
      })
      .catch(() => {
        setCardInfo(null)
        alert('ไม่สามารถอ่านข้อมูลบัตรได้')
      })
  }

  return (
    <div className="container">
      <div className="timestamp-bar">
        {`${weekday} ที่ ${dateStr} เวลา ${timeStr} น.`}
      </div>
      <header className="header">
        <img src="/vite.svg" alt="โลโก้" className="hospital-logo" />
        <div className="hospital-info">
          <div className="hospital-name">{hospital ? hospital.hosname : ''}</div>
          <div className="hospital-address">
            {dbError ? 'ติดต่อฐานข้อมูลไม่ได้' : address}
          </div>
        </div>
      </header>
      <main className="main">
        <p className="instruction">
          กรุณาเสียบบัตรประชาชนก่อนยืนยันตัวตน
        </p>
        <div className="card-image">
          <img src={cardImage} alt="ตัวอย่างบัตรประชาชน" />
        </div>
        <div className="buttons">
          <button className="btn primary" onClick={handleConfirm}>
            ยืนยันตัวตน
          </button>
          <button className="btn danger">เปิดบริการโดยไม่ยืนยันตัวตน</button>
          <button className="btn secondary">เช็คสิทธิรักษาพยาบาล</button>
          <button className="btn muted">
            <img src={printerIcon} alt="ไอคอนพิมพ์" className="icon" />
            พิมพ์บัตรคิว
          </button>
          <button className="btn danger">ปิดสิทธิ(ยืนยันตัวตน)</button>
        </div>
        {cardInfo && <ThaiIDCard info={cardInfo} />}
      </main>
    </div>
  )
}
