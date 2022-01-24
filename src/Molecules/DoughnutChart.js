import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto';

const DoughnutChart = () => {

    const chartData1 = [20, 80];
    const chartData2 = [30, 80];
    const chartData3 = [50, 80];

    // const showData = chartData1[0] + "%";

    var Chart = require('chart.js');
    // console.log(Chart.controllers.DoughnutController.prototype.draw);
    // console.log(Object.assign)

    var originalDoughnutDraw = Chart.controllers.DoughnutController.prototype.draw;

    Object.assign(Chart.controllers.DoughnutController.prototype, {
      draw: function () {
        originalDoughnutDraw.apply(this, arguments);
        var chart = this.chart;

        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.fillStyle = "#333";
        ctx.textBaseline = "middle";

        var text = chart.config.data.datasets[0].data[0] + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.9;

        // console.log(chart.config.data.datasets[0].data[0]);
        ctx.fillText(text, textX, textY);
      }
    });

    const data1 = {
      labels: ["Red", "gray"],
      datasets: [
        {
          data: chartData1,
          backgroundColor: ["red", "gray"]
        }
      ],
      // text: showData
    };

    const data2 = {
      labels: ["Yellow", "gray"],
      datasets: [
        {
          data: chartData2,
          backgroundColor: ["Yellow", "gray"]
        }
      ],
      // text: showData
    };

    const data3 = {
      labels: ["orange", "gray"],
      datasets: [
        {
          data: chartData3,
          backgroundColor: ["orange", "gray"]
        }
      ],
      // text: showData
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return (
        <div>
          <Doughnut data={data1} options={options} height={250} />
          <Doughnut data={data2} options={options} height={250} />
          <Doughnut data={data3} options={options} height={250} />
        </div>
    )
}

export default DoughnutChart;