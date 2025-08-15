import React from 'react'

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

  return (
    <div className="id-card">
      <div className="id-card-header">Thai National ID Card</div>
      <div className="id-card-body">
        <div className="id-card-chip" />
        <div className="id-card-details">
          <div className="row">
            <span className="label">Identification Number</span>
            <span>{formatCid(getField(info, ['cid', 'pid', 'nationalId']))}</span>
          </div>
          <div className="row">
            <span className="label">Name</span>
            <span>{getField(info, ['firstname', 'fname', 'firstNameTH', 'name'])}</span>
          </div>
          <div className="row">
            <span className="label">Last Name</span>
            <span>{getField(info, ['lastname', 'lname', 'lastNameTH', 'surname'])}</span>
          </div>
          <div className="row">
            <span className="label">Date of Birth</span>
            <span>{formatDob(getField(info, ['birthdate', 'birthDate', 'dob']))}</span>
          </div>
          <div className="row">
            <span className="label">Address</span>
            <span className="address">{formatAddress(info)}</span>
          </div>
        </div>
        {photoSrc && <img className="id-card-photo" src={photoSrc} alt="card" />}
      </div>
      <div className="id-card-footer">
        <div className="column">
          <span className="label">Date of Issue</span>
          <span>{formatDate(getField(info, ['issueDate']))}</span>
        </div>
        <div className="column">
          <span className="label">Date of Expiry</span>
          <span>{formatDate(getField(info, ['expireDate', 'expiryDate']))}</span>
        </div>
      </div>
    </div>
  )
}

