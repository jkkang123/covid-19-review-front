import { Bar, Chart } from 'react-chartjs-2'
import 'chart.js/auto'; 
import { useState, useEffect } from 'react'

const BarLineChart = () => {

    const getData = async() => {
        const response = await fetch(
            
            'https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&returnType=JSON&serviceKey=ncMhlOzEE8Q%2FpSEqd1XItWoN%2FBsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6%2BPULf5YtcyON%2FFzAZrfdpg%3D%3D'
            /*
           'https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=2022-01-24&cond%5BbaseDate%3A%3ALT%5D=2022-01-24&cond%5BbaseDate%3A%3ALTE%5D=2022-01-24&cond%5BbaseDate%3A%3AGT%5D=2022-01-24&cond%5BbaseDate%3A%3AGTE%5D=2022-01-24&serviceKey=%09%20ncMhlOzEE8Q%2FpSEqd1XItWoN%2FBsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6%2BPULf5YtcyON%2FFzAZrfdpg%3D%3D'
            */
        );
        const json = await response.json();
        console.log(json);
    }

    useEffect(() => {
        getData();
    }, [])

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