import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';

// replace --> title & description 모두 이상한 문자들이 ( <b>, </b>, &quot; ) 떠오르는데, 직접 replace를 넣으면 작동하지만 함수로 빼려고 하니 작동이 안됨!

export default function News() {

    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('화이자');
    const moment = require('moment');

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

    // 백신 뉴스 api
    const getNews = async () => {
        var client_id = 'hWTkdXKVzGYiHCarA5br';
        var client_secret = 'hojxkLdOG0';
        var request_body = {
            query: query,
            display: 10,
            start: 1,
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
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getNews();
    }, [query])

    return (
        <div>
            <select onChange = { querySelector }>
                <option value="화이자">화이자</option>
                <option value="모더나">모더나</option>
                <option value="부스터샷">부스터샷</option>
            </select>

            {
                news.map((item, i) => {
                    return(
                        <div key={i}>
                            <h1>
                                { 
                                    item.title 
                                    .replace(/<b>/g, "")
                                    .replace(/&quot;/g, "")
                                    .replace(/<\/b>/gi, "")
                                }
                            </h1>
                            <p>
                                { 
                                    item.description 
                                    .replace(/<b>/g, "")
                                    .replace(/&quot;/g, "")
                                    .replace(/<\/b>/gi, "")
                                }
                            </p>
                            <span>{ moment(item.pubDate).format('YYYY. MM. DD.') }</span>
                            
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
}
