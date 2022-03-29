import { useState, useEffect } from 'react';
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './DoughnutChart.scss';

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
        ctx.fillStyle = "#888";
        ctx.textBaseline = "middle";

        var text = chart.config.data.datasets[0].data[0] + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.9;

        // console.log(chart.config.data.datasets[0].data[0]);
        ctx.fillText(text, textX, textY);
      }
    });

    const data1 = {
      labels: ["1차 접종자", "1차 미접종자"],
      datasets: [
        {
          data: chartData1,
          backgroundColor: ["#E9ACE3", "#fafafa"]
        }
      ],
      // text: showData
    };

    const data2 = {
      labels: ["2차 접종자", "2차 미접종자"],
      datasets: [
        {
          data: chartData2,
          backgroundColor: ["#C6ACE9", "#fafafa"]
        }
      ],
      // text: showData
    };

    const data3 = {
      labels: ["3차 접종자", "3차 미접종자"],
      datasets: [
        {
          data: chartData3,
          backgroundColor: ["#ACBDE9", "#fafafa"]
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
        <div className="doughnutCharts">
          <Box sx={{ maxWidth:1200, margin:'0px auto' }}>
              <Grid container spacing={2}>
                  {/* 국내 1차 접종 현황 */}
                  <Grid item xs={12} sm={4}>
                    <Paper className="chart paper" elevation={2}>
                      <h1 className="subtitle">국내 1차 접종 현황</h1>
                      <Doughnut data={data1} options={options} height={250}/>
                      <div className="center">
                        <p className="body">
                          <b>신규</b> {firstCnt}
                        </p>
                        <p className="body">
                          <b>누적</b> {totalFirstCnt}
                        </p>
                      </div>
                    </Paper>
                  </Grid>

                  {/* 국내 2차 접종 현황 */}
                  <Grid item xs={12} sm={4}>
                    <Paper className="chart paper" elevation={2}>
                      <h1 className="subtitle">국내 2차 접종 현황</h1>
                      <Doughnut data={data2} options={options} height={250} />
                      <div className="center">
                        <p className="body">
                          <b>신규</b> {secondCnt}
                        </p>
                        <p className="body">
                          <b>누적</b> {totalSecondCnt}
                        </p>
                      </div>
                    </Paper>
                  </Grid>

                  {/* 국내 3차 접종 현황 */}
                  <Grid item xs={12} sm={4}>
                    <Paper className="chart paper" elevation={2}>
                      <h1 className="subtitle">국내 3차 접종 현황</h1>
                      <Doughnut data={data3} options={options} height={250} />
                      <div className="center">
                        <p className="body">
                          <b>신규</b> {thirdCnt}
                        </p>
                        <p className="body">
                          <b>누적</b> {totalThirdCnt}
                        </p>
                      </div>
                    </Paper>
                  </Grid>
              </Grid>
          </Box>
        </div>
    )
}

export default DoughnutChart;