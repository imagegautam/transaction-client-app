import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useUser } from '../UserContext';

export const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { chartData } = useUser();

  useEffect(() => {
    if (chartData.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [
          {
            data: chartData,
            backgroundColor: [
              'rgb(255,99,132)',
              'rgb(54, 162, 235)',
            ],
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: '100px', height: '50px' }} />
    </div>
  );
};
