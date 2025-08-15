import { useEffect, useState } from 'react'
import cardImage from './assets/react.svg'
import './App.css'

export default function App() {
  const getField = (obj, keys) => {
    for (const key of keys) {
      if (obj && obj[key]) return obj[key]
    }
    return ''
  }

  const formatCid = (cid) => {
    if (!cid) return ''
    const digits = cid.toString().replace(/\D/g, '')
    if (digits.length !== 13) return cid
    return digits.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1 $2 $3 $4 $5')
  }

  const formatDob = (dob) => {
    if (!dob) return ''
    const str = dob.toString()
    if (str.length !== 8) return dob
    let year = parseInt(str.slice(0, 4), 10)
    const month = parseInt(str.slice(4, 6), 10) - 1
    const day = parseInt(str.slice(6, 8), 10)
    if (year > 2400) year -= 543
    const date = new Date(year, month, day)
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatAddress = (info) => {
    if (!info) return ''
    if (info.address)
      return info.address.replace(/undefined/g, '').replace(/\s+/g, ' ').trim()
    const houseNo = getField(info, ['houseNo', 'hno'])
    const villageNo = getField(info, ['moo', 'villageNo'])
    const subDistrict = getField(info, ['tambon', 'subdistrict'])
    const district = getField(info, ['amphur', 'district'])
    const province = getField(info, ['province'])
    const parts = []
    if (houseNo) parts.push(houseNo)
    if (villageNo) parts.push(`หมู่ที่ ${villageNo}`)
    if (subDistrict) parts.push(`ตำบล${subDistrict}`)
    if (district) parts.push(`อำเภอ${district}`)
    if (province) parts.push(`จังหวัด${province}`)
    return parts.join(' ')
  }

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
          alert('ไม่สามารถอ่านข้อมูลบัตรได้')
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
          <button className="btn danger">ยกเลิกการโดยไม่ยืนยันตัวตน</button>
          <button className="btn secondary">พิมพ์บัตรคิว</button>
          <button className="btn muted">ปิดสิทธิ(ยืนยันตัวตน)</button>
        </div>
        {cardInfo && (
          <div className="card-info">
            <div className="row">
              <span className="label">Identification Number</span>
              <span>{formatCid(getField(cardInfo, ['cid', 'pid', 'nationalId']))}</span>
            </div>
            <div className="row">
              <span className="label">Name</span>
              <span>{getField(cardInfo, ['firstname', 'fname', 'firstNameTH', 'name'])}</span>
            </div>
            <div className="row">
              <span className="label">Last name</span>
              <span>{getField(cardInfo, ['lastname', 'lname', 'lastNameTH', 'surname'])}</span>
            </div>
            <div className="row">
              <span className="label">Date of Birth</span>
              <span>{formatDob(getField(cardInfo, ['birthdate', 'birthDate', 'dob']))}</span>
            </div>
            <div className="row">
              <span className="label">Address</span>
              <span>{formatAddress(cardInfo)}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
