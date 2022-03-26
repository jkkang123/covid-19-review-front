import React, {useEffect, useState} from 'react'
import axios from 'plugins/axios'
import { useParams } from 'react-router-dom';
import Profile from 'Molecules/Profile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyIconPng from 'assets/icons/reply-icon.png'
import {useSelector} from "react-redux"
import moment from 'moment';
import { TextField, Button, IconButton } from '@mui/material';
import './Post.scss'

const Post = () => {
  const [postData, setPostData] = useState({
    content: "",
    likeCount: 0,
    dateCreated: "",
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
  const [repleyTextVal, setReplyTextVal] = useState('')
  const [isClickedReply, setIsClickedReply] = useState(false)
  const [replyCommentId, setReplyCommentId] = useState('')
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
      getComment()
      setCommentTextVal('')
    } catch (error){
      console.error(error)
    }
  }

  const uploadReplyComment = async (parentId) => {
    if (!repleyTextVal) return
    const body = {
      content : repleyTextVal,
      parentId
    }
    try {
      const { data } = await axios.post(`post/${id}/comment`, body)
      getComment()
      setIsClickedReply(false)
      setCommentTextVal('')
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
        <div className='post-header-content'>
          <span className='post-vaccine-type'>{'모더나'}</span>
          <span className='post-title'>{postData.title}</span>
          <div className='post-header-right-content'>
            <div className='post-like'>
              <VisibilityIcon/>
              <span className='post-like-text'>{postData.viewCount}</span>
              <ThumbUpAltIcon/>
              <span className='post-like-text'>{postData.likeCount}</span>
            </div>
            <span className='post-upload-time'>{moment(postData.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
        </div>
      </div>
      <div className='post-contents'>
        <div className='content'>{postData.content}</div>
        <div className='images'>
          {
            postData.postImageUrlList.map((elem, index) =>
            <img src={elem} key={index} style={{width:200, height:200, objectFit:'cover'}} alt=''/>
          )}
        </div>
      </div>
      <div className='post-comment'>
        <div className='comment-title'>{`댓글(${commentData?.children ? commentData?.children + commentData?.length : commentData?.length})`}</div>
        {
          commentData?.map((elem, index) => 
          <div className='comment' key={index}>
            <div className='profile-wrapper'>
              <Profile nickName={ elem.writer } size={ 'small' } profileImage={elem.writerProfileImageUrl}/>
            </div>
            <div className='comment-right-cotent'>
              <span className='comment-time'>{moment(elem.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</span>
              <div className='comment-icons'>
                {elem.thisUserLike ? 
                <IconButton aria-label="thumbUpAlt"><ThumbUpAltIcon/></IconButton>
                : <IconButton aria-label="thumbUpOff" onClick={() => likeComment(elem.id)}><ThumbUpOffAltIcon/></IconButton>
                }
                <span>{elem.likeCount ? elem.likeCount : ''}</span>
                <IconButton aria-label="reply" onClick={() => {setIsClickedReply(!isClickedReply); setReplyCommentId(elem.id)}}>
                  <ReplyIcon/>
                </IconButton>
              </div>
            </div>
            <div className='comment-content'>{elem.content}</div>
            {
              elem.children.length !== 0 ?
              elem.children.map((item, index) => 
                 <div className='reply-comment' key={index}>
                  <img src={ReplyIconPng} alt='' style={{width: 32, height: 32}}/>
                  <div className='profile-wrapper'>
                    <Profile nickName={ item.writer } size={ 'small' } profileImage={item.writerProfileImageUrl}/>
                  </div>
                  <div className='comment-right-cotent'>
                    <span className='comment-time'>{moment(item.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <div className='comment-icons'>
                      {item.thisUserLike ? 
                      <IconButton aria-label="thumbUpAlt"><ThumbUpAltIcon/></IconButton>
                      : <IconButton aria-label="thumbUpOff" onClick={() => likeComment(item.id)}><ThumbUpOffAltIcon/></IconButton>
                      }
                      <span>{item.likeCount ? item.likeCount : ''}</span>
                    </div>
                  </div>
                  <div className='reply-comment-content'>{item.content}</div>
                </div>
              )
              : null
            }
            {
              isClickedReply && elem.id === replyCommentId ?
              <div className='write-reply-comment'>
                <Profile nickName={ userData.nickname } size={ 'small' } profileImage={userData.profileImageUrl}/>
                <div className='write-comment-content'>
                  <TextField id="comment-text-field" className="write-comment-text-field" multiline rows={3} value={repleyTextVal} onChange={(e) => setReplyTextVal(e.target.value)}/>
                  <div className="write-comment-button">
                    <Button variant="contained"  color="primary" onClick={() => uploadReplyComment(replyCommentId)}>{'작성 완료'}</Button>
                  </div>
                </div>
              </div> : null
            }
          </div>
          )
        }
        <div className='write-comment'>
          <Profile nickName={ userData.nickname } size={ 'small' } profileImage={userData.profileImageUrl}/>
          <div className='write-comment-content'>
            <TextField id="comment-text-field" multiline rows={3} className="write-comment-text-field" value={commentTextVal} onChange={(e) => setCommentTextVal(e.target.value)}/>
            <div className="write-comment-button">
              <Button variant="contained" color="primary" className="write-comment-button" onClick={uploadComment}>{'작성 완료'}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post