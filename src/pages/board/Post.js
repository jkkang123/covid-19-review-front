import React, {useEffect, useState} from 'react'
import axios from 'plugins/axios'
import { useParams } from 'react-router-dom';
import Profile from 'Molecules/Profile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';

const Post = () => {
  const today = moment().format('YYYY-MM-DD HH:MM:ss')
  const [postData, setPostData] = useState({
    content: "",
    likeCount: 0,
    postImageUrlList: [],
    thisUserLike: false,
    title: "",
    viewCount: 0,
    writer: "",
    writerProfileImageUrl: "",
  })
  const { id } = useParams();

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/post/${id}`)
      console.log(data)
      setPostData(data)
    }catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    getPost()
  },[])

  return (
    <div className='post-wrapper'>
      <div className='post-header'>
        <Profile nickName={ postData.writer } size={ 'small' } profileImage={postData.writerProfileImageUrl}/>
        <div>
          <span>{'모더나'}</span>
          <span>{postData.title}</span>
          <VisibilityIcon/>
          <span>{today}</span>
        </div>
      </div>
      <div className='post-contents'>
        <div className='content'>{postData.content}</div>
        <div className='images'>
          {
            postData.postImageUrlList.map((elem, index) =>
            <img src={elem} key={index} style={{width:200, height:200, objectFit:'cover'}}/>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default Post