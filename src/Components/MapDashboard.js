import React, {useEffect, useState, Component, forwardRef} from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import CovidGoogleMap from './CovidMap'
import PatientInfo from './Patients';
const MapDashBoard =(props)=>{
    const [currentPatient, setCurrentPatient] = useState();
    const [currentPatientMarker, setCurrentPatientMarker] = useState();
    const [patients, setPatients] = useState([]);
    const [ value, setValue ] = useState(0); 
    const[isPlay, setPlay]=useState(true);
    const patientValue=[]
    const step=1
    let idKey=0;
    let currentSlide =value;
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

    let refs = patients.reduce((acc, value) => {
        acc[value.name] = React.createRef();
        return acc;
      }, {});
    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }
      function handlePlayToggle() {
      let interval = setInterval(moving,1000)
      if(isPlay===false){
      setPlay(true);
       clearInterval(interval);
      }
      else 
      {
        setPlay(false);
        setInterval(moving,1000)
      }
    }
    function moving(){
      currentSlide++
      if(currentSlide === patients.length-1)
      {
        currentSlide=0;
      }
      setValue(currentSlide)
      clearInterval(setInterval(moving,1000));
    }

    let handleClick = (id) => {
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
    function valuetext() {
            if(patients.length >0){
              return(
              <div>
              <li>Verified date: {patients[value].verifyDate}</li>
            </div>
             )
            }
        return "Waiting"
        }

    return <Container >
    <Row>
        <Col xs={6} >
            <div>
            <CovidGoogleMap onPatientMarker={patientMarkerClickedHandler}  patientItem = {currentPatientMarker} patientOnValue={value} />
            </div>
            </Col>
            
        <Col xs={3}>
            
            {currentPatient && <PatientInfo 
                        name = {currentPatient.name}
                        address ={ currentPatient.address}
                        note ={currentPatient.note}
                        verifyDate = {currentPatient.verifyDate}
                        onPatientClick = { () =>{
                            handleClick(currentPatient.name)  
                        }}/>}
           
            </Col>
            <Col xs={3} >
            <div className="row1">
                {patients.map((patient, index) => 
                {
                          return(
                           <PatientInfo 
                        key={idKey++}
                        liRef={refs[patient.name]}
                        name = {patient.name}
                        address ={ patient.address}
                        note ={patient.note}
                        verifyDate = {patient.verifyDate}
                        onPatientClick = { () =>{
                            setCurrentPatientMarker(patient);
                            setCurrentPatient(patient);
                        }}/>)
                })}
                
                 </div>
            </Col>
    </Row>
    
    <div >
    <button onClick={() => {
      handlePlayToggle()
    }}>
          {isPlay ? 'Play' : 'Pause'}
    </button>
      <RangeSlider 
      value={value}
      tooltip = 'auto'
      tooltipPlacement = 'bottom'
      tooltipLabel  = {valuetext}
      max={patients.length-1}
      min={0}
      step={step}
      variant = 'warning'
      size='lg'
      onChange={changeEvent => {
        if(patients.length > 0){
          for( let i=0; i<=value; i++){
            patientValue.push(patients[i])
          }}
        setValue(changeEvent.target.value)
      }}
    />
    
    <div>
    <p className="date"> Dec 08 2019
    </p>
    <p className="current">{Date().toLocaleString()}</p>
    </div>
    
    </div>
   
   
</Container>
}

export default MapDashBoard;