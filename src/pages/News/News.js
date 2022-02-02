import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';

export default function News() {

    const [news, setNews] = useState([]);
    
    // 이게 더 맞는 문서 같음 --> https://developers.naver.com/docs/search/news/  ,  https://luckygg.tistory.com/307
    // https://developers.naver.com/docs/serviceapi/datalab/search/search.md#%ED%86%B5%ED%95%A9-%EA%B2%80%EC%83%89%EC%96%B4-%ED%8A%B8%EB%A0%8C%EB%93%9C
    const getNews = async () => {

        var client_id = 'hWTkdXKVzGYiHCarA5br';
        var client_secret = 'hojxkLdOG0';
        var request_body = {
            "query": "vaccine",
            "display": "10",
            "start": "2",
            "sort": "date"
        };
        

        try{
            const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
                params: JSON.stringify(request_body),
                headers:{
                    'X-Naver-Client-Id': client_id,
                    'X-Naver-Client-Secret': client_secret,
                    'Content-Type': 'application/json',
                }
            });

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getNews();
    }, [])

    return (
        <div>
            
        </div>
    )
}
