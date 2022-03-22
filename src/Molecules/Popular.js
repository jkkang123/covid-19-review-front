import React from 'react'
import { useState, useRef, useEffect } from 'react';
import axios from 'plugins/axios';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import './Popular.scss';

export default function Popular() {
    const [popularPost, setPopularPost] = useState([])

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
        getPopularPost();
    }, [])

    return (
        <div className="popular">
            <h1 className="subtitle">인기글</h1>

            {
                popularPost.map((el, i) => {
                    return(
                        <div className="popular_list split" key={i}>
                            <div className="img_body_box">
                                <img src="img/profile.jpg" alt="이미지" />
                                <p className="body">
                                    <b>타이틀</b><br/>
                                    <VisibilityRoundedIcon /> <span className="date">1</span> 
                                    <FavoriteRoundedIcon /> <span className="date">2</span>
                                </p>
                            </div>
                            <span className="date">2022.01.22.</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
