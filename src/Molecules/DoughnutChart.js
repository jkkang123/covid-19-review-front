import { useState, useEffect } from 'react';
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto';

const DoughnutChart = () => {

    {/* 백신 누적 접종자 수 */}
    const[totalFirstCnt, setTotalFirstCnt] = useState('');
    const[totalSecondCnt, setTotalSecondCnt] = useState('');
    const[totalThirdCnt, setTotalThirdCnt] = useState('');

    {/* 백신 신규 접종자 수 */}
    const[firstCnt, setFirstCnt] = useState('');
    const[secondCnt, setSecondCnt] = useState('');
    const[thirdCnt, setThirdCnt] = useState('');

    {/* 백신 접종자 현황 api */}
    const getData = async() => {
        const moment = require('moment');
        const today = moment();
        const format = today.format('YYYY-MM-DD');

        const response = await fetch(
          `https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&returnType=JSON&serviceKey=ncMhlOzEE8Q%2FpSEqd1XItWoN%2FBsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6%2BPULf5YtcyON%2FFzAZrfdpg%3D%3D&cond%5BbaseDate::GT%5D=${format}`
        );
        const json = await response.json();

        setTotalFirstCnt(json.data[0].totalFirstCnt);
        setTotalSecondCnt(json.data[0].totalSecondCnt);
        setTotalThirdCnt(json.data[0].totalThirdCnt);

        setFirstCnt(json.data[0].firstCnt);
        setSecondCnt(json.data[0].secondCnt);
        setThirdCnt(json.data[0].thirdCnt);
    }

    useEffect(() => {
        getData();
    }, [])

    {/* 누적 접종자 퍼센테이지 */}
    const totalFirstCntPercent = Math.round((totalFirstCnt / 51780000) * 100);
    const totalSecondCntPercent = Math.round((totalSecondCnt / 51780000) * 100);
    const totalThirdCntPercent = Math.round((totalThirdCnt / 51780000) * 100);
    
    const chartData1 = [totalFirstCntPercent, 100 - totalFirstCntPercent];
    const chartData2 = [totalSecondCntPercent, 100 - totalSecondCntPercent];
    const chartData3 = [totalThirdCntPercent, 100 - totalThirdCntPercent];

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
          <div>
            <h1>국내 1차 접종 현황</h1>
            <Doughnut data={data1} options={options} height={250} />
            <p>누적 {totalFirstCnt}</p>
            <p>신규 {firstCnt}</p>
          </div>

          <div>
            <h1>국내 2차 접종 현황</h1>
            <Doughnut data={data2} options={options} height={250} />
            <p>누적 {totalSecondCnt}</p>
            <p>신규 {secondCnt}</p>
          </div>
          <div>

            <h1>국내 3차 접종 현황</h1>
            <Doughnut data={data3} options={options} height={250} />
            <p>누적 {totalThirdCnt}</p>
            <p>신규 {thirdCnt}</p>
          </div>
        </div>
    )
}

export default DoughnutChart;