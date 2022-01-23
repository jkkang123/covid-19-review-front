import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import 'chart.js/auto';

const DoughnutChart = () => {
    const options = {
        legend: {
            display: true,
            position: "right"
          },
          elements: {
            arc: {
              borderWidth: 0
            }
          }
      }
      const data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["a", "b", "c", "d"],
        datasets: [
            {
            data: [300, 50, 100, 50],
            backgroundColor: ["#000", "#888", "red", "yellow"],
            hoverBackgroundColor: "#f8f8f8"
            }
        ]
      };

    return (
        <div>
            <Doughnut
                data={data}
                options={options}
            />
        </div>
    )
}

export default DoughnutChart