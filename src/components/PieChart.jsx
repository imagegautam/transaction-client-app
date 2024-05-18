import React, { useEffect, useRef } from 'react'
import { Chart } from "chart.js/auto";

export const PieChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(()=>{
        if (chartInstance.current){
            chartInstance.current.destroy()
        }
           
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef,{

        })



     }, []);
  return (
    <div>
      <canvas ref={chartRef}  style={{width: "100px", height:"50px"}}/>
    </div>
  )
}


