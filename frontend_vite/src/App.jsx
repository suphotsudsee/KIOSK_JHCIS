import { useEffect, useState } from 'react'
import cardImage from './assets/react.svg'
import './App.css'

export default function App() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const weekday = now.toLocaleDateString('th-TH', { weekday: 'long' })
  const dateStr = now.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('th-TH')

  return (
    <div className="container">
      <div className="timestamp-bar">
        {`${weekday} ที่ ${dateStr} เวลา ${timeStr} น.`}
      </div>
      <header className="header">
        <img src="/vite.svg" alt="โลโก้" className="hospital-logo" />
        <div className="hospital-info">
          <div className="hospital-name">รพ.สต.นาฟิน</div>
          <div className="hospital-address">
            หมู่ 02 ตำบลนาฟิน อำเภอศรีเมืองใหม่ จังหวัดอุบลราชธานี
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
          <button className="btn primary">ยืนยันตัวตน</button>
          <button className="btn danger">ยกเลิกการโดยไม่ยืนยันตัวตน</button>
          <button className="btn secondary">พิมพ์บัตรคิว</button>
          <button className="btn muted">ปิดสิทธิ(ยืนยันตัวตน)</button>
        </div>
      </main>
    </div>
  )
}
