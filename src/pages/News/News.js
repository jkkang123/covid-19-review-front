import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';

export default function News() {

    const [news, setNews] = useState([]);

    // https://developers.naver.com/docs/serviceapi/datalab/search/search.md#%ED%86%B5%ED%95%A9-%EA%B2%80%EC%83%89%EC%96%B4-%ED%8A%B8%EB%A0%8C%EB%93%9C
    //  Documents 진짜 모르겠다~~
    const getNews = async () => {

        var client_id = 'hWTkdXKVzGYiHCarA5br';
        var client_secret = 'hojxkLdOG0';
        var request_body = {
            "startDate": "2017-01-01",
            "endDate": "2017-04-30",
            "timeUnit": "month",
            "keywordGroups": [
                {
                    "groupName": "한글",
                    "keywords": [
                        "한글",
                        "korean"
                    ]
                },
                {
                    "groupName": "영어",
                    "keywords": [
                        "영어",
                        "english"
                    ]
                }
            ],
            "device": "pc",
            "ages": [
                "1",
                "2"
            ],
            "gender": "f"
        };
        

        try{
            const response = await axios.post('https://openapi.naver.com/v1/datalab/search', {
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
