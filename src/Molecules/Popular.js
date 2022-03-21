import React from 'react'
import { useState, useRef, useEffect } from 'react';
import axios from 'plugins/axios';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import './Popular.scss';

export default function Popular() {
    const [whatIPost, setWhatIPost] = useState([1, 2, 3, 4])

    /*
    const getPost = async () => {
        try {
            const {data} = await axios.get('/post');
            const whatIPost = data.pagingPostList       
            setWhatIPost(whatIPost)
            console.log(whatIPost)
        } catch (e) {
            console.log(e.response); 
        }
    }

    useEffect(() => {
        getPost();
    }, [])
    */

    return (
        <div className="popular">
            <h1 className="subtitle">인기글</h1>

            {
                whatIPost.map((el, i) => {
                    return(
                        <div className="popular_list split">
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
