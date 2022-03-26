import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Skeleton from '@mui/material/Skeleton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'

import {useSelector} from "react-redux"
import Profile from 'Molecules/Profile';

import './ReviewCard.scss'


const ReviewCard = ({postId, nickname, profileImageUrl, title, vaccine, previewImage, contents, onClickLike, thisUserLike, likeCount, viewCount}) => {
  const [vaccineType, setVaccineType] = useState()

  const navigate = useNavigate()

  const onClickCard = () => {
    navigate(`/review/${postId}`)
  }

  useEffect(() => {
    if (vaccine === 'ASTRAZENECA'){
      setVaccineType('아스트라제네카')
    } else if (vaccine === 'JANSSEN') {
      setVaccineType('얀센')
    } else if (vaccine === 'MODERNA') {
      setVaccineType('모더나')
    } else {
      setVaccineType('화이자')
    }
    
  },[])
  return (
    <Card sx={{ width: 345 }} className='review-card' >
      <CardHeader
        style={{display: 'block'}}
        subheader={
          <div>{'백신 : ' + vaccineType}</div>
        }
        avatar={
          <Profile nickName={ nickname } size={ 'small' } profileImage={profileImageUrl}/>
        }
        title={'제목 : ' + title}
      />
      {
        previewImage ? 
        <CardMedia
          onClick={onClickCard}
          component="img"
          height="190"
          image={previewImage}
          alt=""
        />
        : 
        <Skeleton onClick={onClickCard} sx={{ height: 190 }} animation="wave" variant="rectangular" />
      }
      { <CardContent onClick={onClickCard}>
        {
        contents ? 
          <Typography variant="body2" color="text.secondary" className='review-card-content'>
            {contents}
          </Typography>
          : 
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        }
      </CardContent> }
      <CardActions disableSpacing>
        {
          thisUserLike ? 
          <IconButton aria-label="thumbsUp">
            <ThumbUpAltIcon />
          </IconButton> :
          <IconButton aria-label="thumbsUp" onClick={onClickLike}>
            <ThumbUpOffAltIcon />
        </IconButton>
        }
        <span className='likeCount'>{likeCount}</span>
        <IconButton aria-label="thumbsUp">
          <VisibilityIcon />
        </IconButton>
        <span className='viewCount'>{viewCount}</span>
      </CardActions>
    </Card>
  )
}

export default ReviewCard