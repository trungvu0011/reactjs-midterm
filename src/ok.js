import React,{useEffect, useState, Component} from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import PatientInfo from './com';
const MyComponent = (props) => {
  const [ value, setValue ] = useState(0); 
  const [patients, setPatients] = useState([]);
  const [verifyState, setVerify] = useState([]);
  const[isPlay, setPlay]=useState(false);

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

function valuetext() {
  setVerify(patients)
  if(patients.length > 0){
    return(
      <div>
        <li>Name: {patients[value].name}</li>
        <li>Address: {patients[value].address}</li>
        <li>Note: {patients[value].note}</li>
        <li>Verified date: {patients[value].verifyDate}</li>
      </div>
    )
  }
  return "Waiting"
  }

  function handleSortToggle() {
    if(isPlay===true){
      setPlay(false);
    }
      
    else 
      setPlay(true);
  }
  return (
    <div className="slide">
    <div >
      <RangeSlider 
      value={value}
      tooltip = 'auto'
      tooltipPlacement = 'bottom'
      tooltipLabel  = {valuetext}
      max={patients.length-1}
      min={0}
      step={1}
      variant = 'warning'
      size='lg'
      onChange={changeEvent => setValue(changeEvent.target.value)}
    />
    </div>
    <button onClick={() => handleSortToggle()}>
          {isPlay ? 'Play' : 'Pause'}
    </button>
    </div>
  );

};

export default MyComponent;
