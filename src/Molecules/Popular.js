import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'plugins/axios';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { isLogined } from "components/core/util";
import './Popular.scss';

export default function Popular() {
    const moment = require('moment');
    const [popularPost, setPopularPost] = useState([])
    const [isLogin, setIsLogin] = useState(false)

    const getPopularPost = async () => {
        try {
            const {data} = await axios.get('/post');
            const popularPost = data.pagingPostList.sort((a, b) => b.viewCount - a.viewCount).splice(0, 4);
            setPopularPost(popularPost);
        } catch (e) {
            console.log(e.response); 
        }
    }

    useEffect(() => {
        if (isLogined()) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        getPopularPost();
    }, [])

    return (
        <div className="popular">
            <h1 className="subtitle">인기글</h1>

            {
                popularPost.map((el, i) => {
                    return(
                        <Link to={isLogin ? `/review/${el.id}` : '/'} key={i}>
                            <div className="popular_list split">
                                <div className="img_body_box">
                                    <img src={el.postImageUrl} alt="이미지" />
                                    <p className="body">
                                        <b>{el.title}</b><br/>
                                        <VisibilityRoundedIcon className="eye"/> <span className="date">{el.viewCount}</span> 
                                        <FavoriteRoundedIcon className="heart"/> <span className="date">{el.likeCount}</span>
                                    </p>
                                </div>
                                <span className="date">{moment(el.dateCreated).format('YYYY. MM. DD.')}</span>
                                <span className={`vaccine ${el.vaccineType}`}>{el.vaccineType}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
