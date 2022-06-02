import React, {useEffect, useState, useRef} from 'react'
import UploadReview from './components/UploadReview'
import ReviewCard from './components/ReviewCard'
import './Review.scss'
import axios from 'plugins/axios'
import CreateIcon from '@mui/icons-material/Create';
import { SpeedDial } from '@mui/material';


const Review = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [postData, setPostData] = useState([])

  const getPost = async () => {
    try {
      const { data } = await axios.get('/post')
      setPostData(data?.pagingPostList)
    } catch (error) {
      console.error(error)
    }
  }

  const onClickLikeButton = async (postId) => {
    try{
      await axios.patch(`/post/${postId}/like`)
      getPost()
    } catch (error) {
      console.error(error)
    }
  }

  const openPostDialog = () => {
    setIsOpenDialog(true)
  }

  const setDialogState = (state) => {
    setIsOpenDialog(state)
  }

  useEffect(()=> {
    getPost()
  }, [])

  return (
    <div className='review-page'>
      <div className='review-card-list'>
        {postData.map((elem, index) => 
          <ReviewCard
            key={index}
            postId={elem.id}
            nickname={elem.writer}
            title={elem.title}
            vaccine={elem.vaccineType}
            previewImage={elem.postImageUrl}
            contents={elem.content}
            profileImageUrl={elem.writerProfileImageUrl}
            likeCount={elem.likeCount}
            viewCount={elem.viewCount}
            thisUserLike={elem.thisUserLike}
            onClickLike={() => {onClickLikeButton(elem.id)}}
          />
        )}
      </div>
      <UploadReview isDialog={isOpenDialog} changeDialogState={setDialogState}/>
      {/* <Button variant="contained" onClick={openPostDialog}>글쓰기</Button> */}
      <SpeedDial ariaLabel="open-post-speed-dial" sx={{ position: 'fixed', bottom: 50, right: 50 }} icon={<CreateIcon/>} onClick={openPostDialog}/>
    </div>
  )
}

export default Review