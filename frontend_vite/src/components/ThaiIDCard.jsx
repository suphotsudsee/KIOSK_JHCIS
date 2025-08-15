import React from 'react'
import './ThaiIDCard.css'
import thaiIdBg from '../assets/thai-id-bg.png'

export default function ThaiIDCard({ info }) {
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
    if (info.address) {
      return info.address.replace(/undefined/g, '').replace(/\s+/g, ' ').trim()
    }
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

  const formatDate = (date) => {
    if (!date) return ''
    return formatDob(date)
  }

  const photo = getField(info, ['photo'])
  const photoSrc = photo ? `data:image/jpeg;base64,${photo}` : ''
  const bg = getField(info, ['cardBg', 'bg', 'background'])
  const bgStyle = bg
    ? { backgroundImage: `url(data:image/png;base64,${bg})` }
    : { backgroundImage: `url(${thaiIdBg})` }

  return (
    <div className="thai-id-card" style={bgStyle}>
      <div className="field cid">{formatCid(getField(info, ['cid', 'pid', 'nationalId','citizenId']))}</div>
      <div className="field name">{getField(info, ['firstname', 'fname', 'firstNameTH', 'name'])}</div>
      <div className="field lastname">{getField(info, ['lastname', 'lname', 'lastNameTH', 'surname'])}</div>
      <div className="field dob">{formatDob(getField(info, ['birthdate', 'birthDate', 'dob','birthday']))}</div>
      <div className="field address">{formatAddress(info)}</div>
      {photoSrc && <img className="photo" src={photo} alt="card" />}
      <div className="field issue">{formatDate(getField(info, ['issueDate','issue']))}</div>
      <div className="field expire">{formatDate(getField(info, ['expireDate', 'expiryDate','expire']))}</div>
    </div>
  )
}
