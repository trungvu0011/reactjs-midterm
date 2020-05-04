import React, {useEffect, useState, forwardRef} from 'react'
import { Line } from 'react-chartjs-2';

const Stats =() =>{
    const [dataVN, setDataVN] = useState();
    const [dataGlobal, setDataGlobal] = useState([]);
    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-chart-vn.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setDataVN(result);
                },
                (error) => {
                }
            )
    }, []);
    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-total.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setDataGlobal(result);
                },
                (error) => {
                }
            )
    }, []);

    //variable for VN
    let lable=[]
    let nguoibenh=[]
    let nghinhiem=[]
    let hoiphuc=[]
    //variable for Global
    let lableGlobal=[]
    let nguoibenhGlobal=[]
    let nghinhiemGlobal=[]
    let hoiphucGlobal=[]
    //Set data for VN
    const resultVN = [];
    for(var i in dataVN)
    resultVN.push([i,dataVN[i]]);
    //Set data for Global
    const resultGlobal = [];
    for(var index in dataGlobal)
    resultGlobal.push([index,dataGlobal[index]]);
    
    //Dataset for chart VN
    for(let i=0;i<resultVN.length;i++){
        lable.push(resultVN[i][0])
        nguoibenh.push(resultVN[i][1][0])
        nghinhiem.push(resultVN[i][1][1])
        hoiphuc.push(resultVN[i][1][2])
    }
    //Dataset for chart Global
    for(let i=0;i<resultGlobal.length;i++){
        lableGlobal.push(resultGlobal[i][0])
        nguoibenhGlobal.push(resultGlobal[i][1][0])
        nghinhiemGlobal.push(resultGlobal[i][1][1])
        hoiphucGlobal.push(resultGlobal[i][1][2])
    }
    //data chart VN
    const dataSetVN = {
        labels: lable,
        datasets: [{
            label: "Người nhiễm bệnh",
            data: nguoibenh,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(207, 0, 15, 1)',
    
        },
        {
            label: "Người nghi nhiễm",
            data: nghinhiem,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(150, 40, 27, 1)',
                
        },
        {
            label: "Người hồi phục",
            data: hoiphuc,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(240, 255, 0, 1)',
        },
    ],
    }
    //data chart Global
    const dataSetGlobal = {
        labels: lableGlobal,
        
        datasets: [{
            label: "Người nhiễm bệnh",
            data: nguoibenhGlobal,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(207, 0, 15, 1)',
    
        },
        {
            label: "Người tử vong",
            data: nghinhiemGlobal,
            backgroundColor: 'rgba(54, 162, 235, 2)',
            borderColor: 'rgba(150, 40, 27, 1)',
        },
        {
            label: "Người hồi phục",
            data: hoiphucGlobal,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(240, 255, 0, 1)',
        },
    ],
    }
    return(
        <div>
        <div>
           
            <Line className="chart"
             data={dataSetVN}
            options={{ maintainAspectRatio: false ,
                title:{
                    display: true,
                    text: "Covid19 tại Việt Nam",
                    fontSize:25
                  },
            }}
        />
        </div>
        <div>
            <Line className="chart"
             data={dataSetGlobal}
            options={{ maintainAspectRatio: true ,
                displayLegend: true,
                title:{
                    display: true,
                    text: "Covid19 trên toàn thế giới",
                    fontSize:25,
                  },
            }}
        />
        </div>
        </div>
    )
}

export default Stats