import React, {useEffect, useState} from 'react'

const PatientInfo =({name, address, note, verifyDate,liRef ,onPatientClick})=>{
    return(
                <ul>
                <button onClick={onPatientClick}>
                <ul>
                <li ref ={liRef} >Name: {name}</li>
                <div>Address: {address}</div>
                <div>Note: {note}</div>
                <div>Verified date: {verifyDate}</div>
                </ul>
            </button>
            </ul>
    )
}

export default PatientInfo