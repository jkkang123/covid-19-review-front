import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// pagination의 숫자를 클릭하면 자동으로 색상이 들어옴, 그런데 selectBox를 Change했을 때 pagination만 변하지 않는다. 연동하는 방법은 ?
// <Pagination page={ page } /> --> 실패. 왜??
export default function News() {

    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('화이자');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState();
    const [pageCounts, setPageCounts] = useState()
    const moment = require('moment');
    const display = 10;
    const initial = 1;

    // 선택한 option에 따라 query를 바꾸는 함수 querySelector
    const querySelector = (e) => {
        if( e.target.value === '화이자' ){
            setQuery('화이자');
        } else if( e.target.value === '모더나' ){
            setQuery('모더나');
        } else if( e.target.value === '부스터샷' ){
            setQuery('부스터샷');
        }
    }

    // 첫페이지로 이동하는 함수 jumpFirst
    const jumpFirst = () => {
        setPage(1);
    }

    // 백신 뉴스 api
    const getNews = async () => {
        var client_id = 'hWTkdXKVzGYiHCarA5br';
        var client_secret = 'hojxkLdOG0';
        var request_body = {
            query: query,
            display: display,
            start: page,
            sort: 'date'
        };
        
        try{
            const response = await axios.get('api/v1/search/news.json', {
                params: request_body,
                headers:{
                    'X-Naver-Client-Id': client_id,
                    'X-Naver-Client-Secret': client_secret,
                    'Content-Type': 'application/json',
                }
            });
            setNews(response.data.items);
            setTotal(response.data.total)
        } catch (e) {
            console.log(e);
        }
    }

    // <b>, &quot;, </b> 지우는 함수 cleanString
    const cleanString = (value) => {
        return value
        .replace(/<b>/g, "")
        .replace(/&quot;/g, "")
        .replace(/<\/b>/gi, "")
    }
   
    useEffect(() => {
        getNews();
        setPageCounts(Math.ceil(total / display));
    }, [query,page,total])

    return (
        <div>
            <select onChange = { e => { querySelector(e); jumpFirst(); } }>
                <option value="화이자">화이자</option>
                <option value="모더나">모더나</option>
                <option value="부스터샷">부스터샷</option>
            </select>

            {
                news.map((item, i) => {
                    return(
                        <div key={i}>
                            <h1>{ cleanString(item.title) }</h1>
                            <p>{ cleanString(item.description) }</p>
                            <span>{ moment(item.pubDate).format('YYYY. MM. DD.') }</span>
                            
                            <hr/>
                        </div>
                    )
                })
            }

            <Stack spacing={2}>
                <Pagination 
                    onChange={ (e,value) => {setPage(value)} } 
                    count={ pageCounts } 
                    color="primary" 
                    page={ page }
                />
            </Stack>
        </div>
    )
}
