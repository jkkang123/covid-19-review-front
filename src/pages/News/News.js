import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Tags from 'components/common/common-select'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function News() {

    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('화이자');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState('');
    const [pageCounts, setPageCounts] = useState()
    const moment = require('moment');
    const display = 10;
    const initial = 1;

    // query를 선택하는 함수 querySelector
    const querySelector = (value) => {
        let newQuery = [];
        for(let i=0; i<value.length; i++){
            newQuery.push(value[i].title)
        }
        setQuery(newQuery.join());
    }; 

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

    // <b>, &quot;, </b>, &gt; 지우는 함수 cleanString
    const cleanString = (value) => {
        return value
        .replace(/<b>/g, "")
        .replace(/&quot;/g, "")
        .replace(/<\/b>/gi, "")
        .replace(/&gt;/gi, "")
    }
   
    useEffect(() => {
        getNews();
        setPageCounts(Math.ceil(total / display));
    }, [query,page,total])

    return (
        <div>
            <Box 
                sx={{ 
                    display:'flex',
                    flexDirection:'column',
                    gap:2,
                    maxWidth:1200, 
                    margin:'20px auto' 
                }}
            >
                {/* 백신 셀렉트 박스 */}
                <Tags 
                    onChange={(e, value) => { jumpFirst(); querySelector(value); }}
                />

                {/* 뉴스 */}
                <Grid container spacing={2}>
                    {
                        news.map((item, i) => {
                            return(
                                <Grid item xs={12} lg={6} key={i}>
                                    <a href={ item.link }>
                                        <Paper className="popular paper" elevation={2}>
                                            <h1 className="subtitle">{ cleanString(item.title) }</h1>
                                            <p className="body">{ cleanString(item.description) }</p>
                                            <span className="date">{ moment(item.pubDate).format('YYYY. MM. DD.') }</span>
                                        </Paper>
                                    </a>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                
                {/* 페이지네이션 */}
                <Box>
                    <Pagination 
                        onChange={ (e,value) => {setPage(value)} } 
                        count={ pageCounts } 
                        color="primary" 
                        page={ page }
                    />
                </Box>
            </Box>
        </div>
    )
}
