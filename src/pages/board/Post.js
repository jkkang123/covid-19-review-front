import React, {useEffect, useState} from 'react'
import axios from 'plugins/axios'
import { useParams } from 'react-router-dom';
import Profile from 'Molecules/Profile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useSelector} from "react-redux"
import moment from 'moment';
import { TextField, Button, IconButton } from '@mui/material';

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
  const [commentData, setCommentData] = useState()
  const { id } = useParams();
  const [commentTextVal, setCommentTextVal] = useState('')
  const userData = useSelector((state) => state.common.user)

  const getPost = async () => {
    try {
      const { data } = await axios.get(`post/${id}`)
      console.log(data)
      setPostData(data)
    }catch (error) {
      console.error(error)
    }
  }

  const getComment = async () => {
    try {
      const { data } = await axios.get(`post/${id}/comment`)
      setCommentData(data)
      console.log(data)
    } catch (error){
      console.error(error)
    }
  }

  const uploadComment = async () => {
    if (!commentTextVal) return
    const body = {
      content : commentTextVal,
      parentId : 0
    }
    try {
      const { data } = await axios.post(`post/${id}/comment`, body)
      console.log(data)
      getComment()
    } catch (error){
      console.error(error)
    }
  }

  const likeComment = async (commentId) => {
    try {
      await axios.patch(`post/${id}/comment/${commentId}/like`)
      getComment()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    getPost()
    getComment()
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
      <div className='post-comment'>
        <div className='comment-title'>{`댓글(${commentData?.children ? commentData?.children + commentData?.length : commentData?.length})`}</div>
        {
          commentData?.map((elem, index) => 
          <div className='comment' key={index}>
            <Profile nickName={ elem.writer } size={ 'small' } profileImage={elem.writerProfileImageUrl}/>
            <span className='comment-time'>{today}</span>
            {elem.thisUserLike ? 
            <IconButton aria-label="thumbUpAlt"><ThumbUpAltIcon/></IconButton>
            : <IconButton aria-label="thumbUpOff" onClick={() => likeComment(elem.id)}><ThumbUpOffAltIcon/></IconButton>
            }
            <span>{elem.likeCount ? elem.likeCount : ''}</span>
            <div className='comment-content'>{elem.content}</div>
          </div>
          )
        }
        <div className='write-comment'>
          <Profile nickName={ userData.nickname } size={ 'small' } profileImage={userData.profileImageUrl}/>
          <Button variant="contained" color="primary" onClick={uploadComment}>{'작성 완료'}</Button>
          <TextField id="comment-text-field" multiline rows={3} value={commentTextVal} onChange={(e) => setCommentTextVal(e.target.value)}/>
        </div>
      </div>
    </div>
  )
}

export default Post