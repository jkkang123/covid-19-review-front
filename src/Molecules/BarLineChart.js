import { Bar, Chart } from 'react-chartjs-2'
import 'chart.js/auto'; 
import { useState, useEffect } from 'react'

const BarLineChart = () => {

    const moment = require('moment');
    const today = moment();

    const format = today.format('YYYY-MM-DD');

    const todayFormat = today.format('MM.DD');
    const oneDayAgo = moment().subtract(1, 'days').format('MM.DD');
    const twoDaysAgo = moment().subtract(2, 'days').format('MM.DD');
    const threeDaysAgo = moment().subtract(3, 'days').format('MM.DD');
    const fourDaysAgo = moment().subtract(4, 'days').format('MM.DD');
    const fiveDaysAgo = moment().subtract(5, 'days').format('MM.DD');
    const sixDaysAgo = moment().subtract(6, 'days').format('MM.DD');

    {/* 백신 확진자 현황 api - SERVICE KEY IS NOT REGISTERED ERROR ( 시간 지나야 사용할 수 있는지 확인이 필요함. )*/}
    const getData = () => {
      var xhr = new XMLHttpRequest();
      var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'; /*URL*/
      // 일반 인증키(Encoding) ncMhlOzEE8Q%2FpSEqd1XItWoN%2FBsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6%2BPULf5YtcyON%2FFzAZrfdpg%3D%3D
      // 일반 인증키(Decoding) ncMhlOzEE8Q/pSEqd1XItWoN/BsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6+PULf5YtcyON/FzAZrfdpg==
      var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'ncMhlOzEE8Q/pSEqd1XItWoN/BsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6+PULf5YtcyON/FzAZrfdpg=='; /*Service Key*/
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
      queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20220110'); /**/
      queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20220110'); /**/
      xhr.open('GET', url + queryParams);
      xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
              console.log(xhr.response);
              // alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
          }
      };
      
      xhr.send('');
    }

    useEffect(() => {
      getData();
    }, [])

    const data = {
        labels: [
          sixDaysAgo,
          fiveDaysAgo,
          fourDaysAgo,
          threeDaysAgo,
          twoDaysAgo,
          oneDayAgo,
          todayFormat
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
        <div>
          <h1>국내 신규 확진자</h1>
          <Bar data={data} options={options}/>
        </div>
    )

}

export default BarLineChart;