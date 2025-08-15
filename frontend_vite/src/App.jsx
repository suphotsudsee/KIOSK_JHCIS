import { useEffect, useState } from 'react'
import cardImage from './assets/cidtemp.png'
import cardTemp from './assets/Public_Health.png'
import printerIcon from './assets/printer.svg'
import ThaiIDCard from './components/ThaiIDCard'
import './App.css'

export default function App() {
  const [now, setNow] = useState(new Date())
  const [hospital, setHospital] = useState(null)
  const [dbError, setDbError] = useState(false)
  const [cardInfo, setCardInfo] = useState(null)
  const [rightInfo, setRightInfo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCidModalOpen, setIsCidModalOpen] = useState(false)
  const [cidInput, setCidInput] = useState('')
  const [personInfo, setPersonInfo] = useState(null)
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false)

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

  const getField = (obj, keys) => {
    for (const key of keys) {
      if (obj && obj[key]) return obj[key]
    }
    return ''
  }

  const calcAge = (dob) => {
    if (!dob) return ''
    const str = dob.toString().replace(/-/g, '')
    if (str.length !== 8) return ''
    let year = parseInt(str.slice(0, 4), 10)
    const month = parseInt(str.slice(4, 6), 10) - 1
    const day = parseInt(str.slice(6, 8), 10)
    if (year > 2400) year -= 543
    const birth = new Date(year, month, day)
    const nowDate = new Date()
    let years = nowDate.getFullYear() - birth.getFullYear()
    let months = nowDate.getMonth() - birth.getMonth()
    let days = nowDate.getDate() - birth.getDate()
    if (days < 0) {
      months -= 1
      days += new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years -= 1
      months += 12
    }
    return `${years} ปี ${months} เดือน ${days} วัน`
  }

  const handleConfirm = () => {
    fetch('http://localhost:3001/jhcis/api/v1/read')
      .then((res) => res.json())
      .then((result) => {
        if (result.ok && result.data) {
          setCardInfo(result.data)
//        console.log(result.data);

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

  const handleCheckRight = () => {
    fetch('http://localhost:8189/api/smartcard/read?readImageFlag=false')
      .then((res) => res.json())
      .then((result) => {
        const data = result.data || result
  //      console.log(data)
        if (data && !data.error) {
          const cid = getField(data, ['cid', 'pid', 'nationalId', 'citizenId'])
          const fname = getField(data, ['firstname', 'fname', 'firstNameTH', 'name'])
          const lname = getField(data, ['lastname', 'lname', 'lastNameTH', 'surname'])
          const age = calcAge(
            getField(data, ['birthdate', 'birthDate', 'dob', 'birthday'])
          )
          const mainCode = getField(data, ['mainInscl', 'mainInsclCode'])
          const mainName = getField(data, ['mainInsclName','mainInscl'])
          const subCode = getField(data, ['subInscl', 'subInsclCode'])
          const subName = getField(data, ['subInsclName','subInscl'])
          setRightInfo({
            cid,
            name: `${fname} ${lname}`.trim(),
            age,
            main: mainCode && mainName ? `${mainName}` : '',
            sub: subCode && subName ? `${subName}` : '',
          })
          setIsModalOpen(true)
        } else {
          setRightInfo(null)
          alert(result.message || 'ไม่สามารถตรวจสอบสิทธิได้')
        }
      })
      .catch(() => {
        setRightInfo(null)
        alert('ไม่สามารถตรวจสอบสิทธิได้')
      })
  }

  const handleOpenWithoutId = () => {
    setCidInput('')
    setIsCidModalOpen(true)
  }

  const handleKeypadClick = (key) => {
    if (key === 'del') {
      setCidInput((prev) => prev.slice(0, -1))
    } else if (cidInput.length < 13) {
      setCidInput((prev) => prev + key)
    }
  }

  const handleSearchCid = () => {
    if (cidInput.length !== 13) return
    fetch(`http://localhost:3001/jhcis/api/v1/person/${cidInput}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok && result.data) {
          setPersonInfo(result.data)
        } else {
          setPersonInfo(null)
        }
        setIsPersonModalOpen(true)
      })
      .catch(() => {
        setPersonInfo(null)
        setIsPersonModalOpen(true)
      })
    setIsCidModalOpen(false)
  }

  const handleConfirmPerson = () => {
    if (!personInfo) return
    fetch('http://localhost:3001/jhcis/api/v1/visit/newvisit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pcucode: personInfo.pcucodeperson,
        pid: personInfo.pid,
        rightcode: personInfo.rightcode,
        rightno: personInfo.rightno,
        hosmain: personInfo.hosmain,
        hossub: personInfo.hossub,
      }),
    })
      .then(() => {
        setPersonInfo(null)
        setCidInput('')
      })
      .catch(() => {})
      .finally(() => setIsPersonModalOpen(false))
  }

  const closeCidModal = () => {
    setIsCidModalOpen(false)
  }

  const closePersonModal = () => {
    setIsPersonModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="container">
      <div className="timestamp-bar">
        {`${weekday} ที่ ${dateStr} เวลา ${timeStr} น.`}
      </div>
      <header className="header">
        <img src={cardTemp} alt="โลโก้" className="hospital-logo" />
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
          {cardInfo ? (
            <ThaiIDCard info={cardInfo} />
          ) : (
            <img src={cardImage} alt="ตัวอย่างบัตรประชาชน" />
          )}
        </div>
        <div className="buttons">
          <button className="btn primary" onClick={handleConfirm}>
            ยืนยันตัวตน
          </button>
          <button className="btn danger" onClick={handleOpenWithoutId}>เปิดบริการโดยไม่ยืนยันตัวตน</button>
          <button className="btn secondary" onClick={handleCheckRight}>เช็คสิทธิรักษาพยาบาล</button>
          <button className="btn muted">
            <img src={printerIcon} alt="ไอคอนพิมพ์" className="icon" />
            พิมพ์บัตรคิว
          </button>
          <button className="btn danger">ปิดสิทธิ(ยืนยันตัวตน)</button>
        </div>
        
      </main>
      {isModalOpen && rightInfo && (
        <div className="modal">
          <div className="modal-content">
            <div className="rights-info">
              <div>หมายเลขบัตรประชาชน: {rightInfo.cid}</div>
              <div>ชื่อ: {rightInfo.name}</div>
              <div>อายุ: {rightInfo.age}</div>
              <div>สิทธิหลัก: {rightInfo.main}</div>
              <div>สิทธิรอง: {rightInfo.sub}</div>
            </div>
            <button className="btn secondary modal-close" onClick={closeModal}>
              ปิด
            </button>
          </div>
        </div>
      )}

      {isCidModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              className="keypad-input"
              value={cidInput}
              placeholder="กรอกเลขบัตรประชาชน"
              readOnly
            />
            <div className="keypad">
              {[1,2,3,4,5,6,7,8,9,0].map((num) => (
                <button
                  key={num}
                  className="key"
                  onClick={() => handleKeypadClick(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button className="key" onClick={() => handleKeypadClick('del')}>
                ลบ
              </button>
            </div>
            <div className="keypad-actions">
              <button className="btn muted" onClick={closeCidModal}>ปิด</button>
              <button className="btn secondary" onClick={handleSearchCid}>ค้นหา</button>
            </div>
          </div>
        </div>
      )}

      {isPersonModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {personInfo ? (
              <>
                <div className="rights-info">
                  <div>
                    HN:{personInfo.pid} {`${personInfo.titlename || ''}${personInfo.fname || ''} ${personInfo.lname || ''}`}
                  </div>
                  <div>ยืนยันการเปิดบริการ</div>
                </div>
                <div className="modal-actions">
                  <button className="btn primary" onClick={handleConfirmPerson}>ยืนยัน</button>
                  <button className="btn danger" onClick={closePersonModal}>ยกเลิก</button>
                </div>
              </>
            ) : (
              <>
                <div className="rights-info">ไม่พบข้อมูล โปรดติดต่อ จนท.</div>
                <button className="btn secondary modal-close" onClick={closePersonModal}>
                  ปิด
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
