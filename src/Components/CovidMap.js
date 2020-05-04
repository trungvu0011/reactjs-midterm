import React, {useEffect, useState, Component} from 'react'
import {Map, Marker,InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import PatientInfo from './Patients';
const CovidGoogleMap =({onPatientMarker, patientItem, patientOnValue})=>{
    const [patients, setPatients] = useState([]);
    const [patientList, setPatientList] = useState(
      {lat: 10.7624176, lng: 106.6790081,}
      );
      let patientValue=[]
    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                  result.data.sort(function(a,b){
                    return new Date(a.verifyDate) - new Date(b.verifyDate);
                  });
                    setPatients(result.data);
                },
                (error) => {
                }
            )
    }, []);

  if (patients.length > 0){
  for( let i=0; i<= patientOnValue  ; i++){
      patientValue.push(patients[i])
  }
  }
  return (
    <Map 
    google={window.google}
      zoom={16}
      style={{width: '100%', height: '600px', position: 'relative'}}
      center={{
        lat:patientItem ? patientItem.lat : 10.7624176,
        lng:patientItem ? patientItem.lng : 106.6790081, 
      }}>
  
      { patientValue.map((patient, index) => 
      (<Marker key={index} 
        position={{lat: patient.lat, lng:  patient.lng }}
        onClick={()=>{
          onPatientMarker(patient)
        }}
        title={
          patient.name + " \n" + patient.address +" \n" + patient.note + " \n" + patient.verifyDate
        }
        animation = {Animation.drop}
        
      >
      </Marker>
      ))}
    </Map>
  );
  
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAf6E1CQCl3XNMNjSE-YlGPfXXfrwX_Llg')
})(CovidGoogleMap)
