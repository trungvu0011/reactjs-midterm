import React from 'react'

const PatientInfo =({ address, note, verifyDate,})=>{
    return(
        <div>
        <div>Address: {address}</div>
        <div>Note: {note}</div>
        <div>Verified date: {verifyDate}</div>
        </div>
    )
}

export default PatientInfo