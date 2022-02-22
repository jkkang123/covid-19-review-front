import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Skeleton from '@mui/material/Skeleton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {useSelector} from "react-redux"
import Profile from 'Molecules/Profile';


const ReviewCard = ({title, vaccine, previewImage, contents}) => {
  const userData = useSelector((state) => state.common.user)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div>{vaccine ?? vaccine}</div>
      <CardHeader
        avatar={
          <Profile nickName={ userData.nickname } size={ 'small' } profileImage={userData.profileImageUrl}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      {
        previewImage ? 
        <CardMedia
          component="img"
          height="190"
          image={previewImage}
          alt=""
        />
        : 
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      }
      <CardContent>
        {
        contents ? 
          <Typography variant="body2" color="text.secondary">
            {contents}
          </Typography>
          : 
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        }
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ReviewCard