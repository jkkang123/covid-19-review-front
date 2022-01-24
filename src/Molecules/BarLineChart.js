import React from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import 'chart.js/auto'; 

const BarLineChart = () => {

    const data = {
        labels: [
          '1.18',
          '1.19',
          '1.20',
          '1.21',
          '1.22',
          '1.23',
          '1.24'
        ],
        datasets: [{
          type: 'bar',
          label: '신규 확진자수',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          type: 'line',
          label: '7일 평균',
          data: [10, 20, 30, 40, 60, 70, 100],
          fill: false,
          borderColor: 'rgb(54, 162, 235)'
        }]
    };

    const options = {
        plugins: {
          legend: {
            display: true,
            position:'bottom',
          },
          labels: {
            position: 'bottom'
          },
        },
    };

    return(
        <Bar data={data} options={options}/>
    )

}

export default BarLineChart;