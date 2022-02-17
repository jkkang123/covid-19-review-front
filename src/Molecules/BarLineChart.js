import { Bar, Chart } from 'react-chartjs-2'
import 'chart.js/auto'; 
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';

const BarLineChart = () => {

    const [newDecideCntArr, setNewDecideCntArr] = useState([]);
    const [newDeathCntArr, setNewDeathCntArr] = useState([]);

    const moment = require('moment');
    const today = moment();

    const format = today.format('YYYYMMDD');
    const sevenDaysAgoFormat = moment().subtract(7, 'days').format('YYYYMMDD');

    
    const oneDayAgo = moment().subtract(1, 'days').format('MM.DD');
    const twoDaysAgo = moment().subtract(2, 'days').format('MM.DD');
    const threeDaysAgo = moment().subtract(3, 'days').format('MM.DD');
    const fourDaysAgo = moment().subtract(4, 'days').format('MM.DD');
    const fiveDaysAgo = moment().subtract(5, 'days').format('MM.DD');
    const sixDaysAgo = moment().subtract(6, 'days').format('MM.DD');
    const sevenDaysAgo = moment().subtract(7, 'days').format('MM.DD');

    {/* 백신 확진자 현황 api - api호출을 여러번 할 수 없나?? */}
    const getData = () => {
        var xhr = new XMLHttpRequest();
        var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'ncMhlOzEE8Q%2FpSEqd1XItWoN%2FBsvypkNC1vzjYNRRGcABDkRcAXcQd9wOxSfX2G6%2BPULf5YtcyON%2FFzAZrfdpg%3D%3D'; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
        queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(sevenDaysAgoFormat); /**/
        queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(format); /**/
        xhr.open('GET', url + queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                var XMLParser = require('react-xml-parser')
                var xml = new XMLParser().parseFromString(xhr.response); 

                let decideCntArr = [];
                let deathCntArr = [];
                let newDecideCntArr = [];
                for(let i=0; i<8; i++){
                  decideCntArr.unshift(xml.children[1].children[0].children[i].children[2].value);
                  deathCntArr.unshift(xml.children[1].children[0].children[i].children[1].value);
                }
                for(let i=0; i<decideCntArr.length-1; i++){
                  newDecideCntArr.push(decideCntArr[i+1] - decideCntArr[i])
                }
                setNewDecideCntArr(newDecideCntArr);
                setNewDeathCntArr(deathCntArr);
            }
        };
        xhr.send('');
    }

    useEffect(() => {
      getData();   
    }, [])

    const data = {
        labels: [
          sevenDaysAgo,
          sixDaysAgo,
          fiveDaysAgo,
          fourDaysAgo,
          threeDaysAgo,
          twoDaysAgo,
          oneDayAgo,
        ],
        datasets: [{
          type: 'bar',
          label: '신규 확진자수',
          data: newDecideCntArr,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          type: 'line',
          label: '누적 사망자',
          data: newDeathCntArr,
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
          <h1 className="subtitle">국내 신규 확진자</h1>
          <Box
            
          >
            <Bar data={data} options={options} height="210rem" />
          </Box>
        </div>
    )

}

export default BarLineChart;