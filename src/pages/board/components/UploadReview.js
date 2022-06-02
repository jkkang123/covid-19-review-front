import React, {useEffect, useState, useRef} from 'react'
import '../Review.scss'
import axios from 'plugins/axios'
import qs from 'qs'
import Button from '@mui/material/Button';
import CommonDialog from 'components/common/common-dialog';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const UploadReview = ({isDialog, postId, isModify, changeDialogState, title, content}) => {
  const [vaccineValue, setVaccineValue] = useState('')
  const [titleValue, setTitleValue] = useState(title)
  const [contentValue, setContentValue] = useState(content)
  const [files, setFile] = useState([]);
  const [image, setImage] = useState([]);
  const fileInput = useRef(null);

  const getPost = async () => {
    try {
      const { data } = await axios.get('/post')
    } catch (error) {
      console.error(error)
    }
  }

  const onCilckVaccine = (e) => {
    setVaccineValue(e.target.value)
  }

  const closePostDialog = () => {
    if ((titleValue || contentValue || image.length !== 0 ) && !isModify){
      if (window.confirm("저장 되지 않은 내용이 있습니다 정말 나가겠습니까?")) {
        alert("삭제되었습니다.");
        resetPostDialog()
      } 
    } else {
      changeDialogState(false)
    }
  }

  const resetPostDialog = () => {
    setVaccineValue('')
    setTitleValue('')
    setContentValue('')
    setImage([])
    changeDialogState(false)
  }

  const onImageHandler = (e) => {
    if(e.target.files.length !== 0){
      setFile(e.target.files)
    } else{  
      return
    }
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return (new Promise((resolve,reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', (ev) => {
              resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
      }));
    }))
    .then(images => {
        setImage(images)
    }, error => {        
        console.error(error);
    });

  }

  const onClickSavePost = async () => {
    const formdata = new FormData();
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("multipartFileList", files[i])
      }
    }
    const model = {
      content: contentValue,
      title: titleValue,
      vaccineType: vaccineValue,
      ordinalNumber: 1
    }
    if (isModify) {
      model.wantToChangePostImage = true
      model.postId = postId()
    }
    const params = qs.stringify(model)
    try {
      if (!isModify) {
        await axios.post(`/post?${params}`, formdata)
        resetPostDialog()
        getPost()
      } else {
        await axios.patch(`/post?${params}`, formdata)
        resetPostDialog()
        getPost()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    getPost()
  }, [])

  useEffect(() => {
    setTitleValue(title)
    setContentValue(content)
  }, [title, content])

  return (
    <CommonDialog openState={isDialog} handleClose={closePostDialog}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="vaccine-select-label">백신</InputLabel>
      <Select
          labelId="백신 선택"
          id="vaccine-select"
          value={vaccineValue}
          label="백신"
          defaultValue={''}
          onChange={onCilckVaccine}
      >
          <MenuItem value={'ASTRAZENECA'}>아스트라제네카</MenuItem>
          <MenuItem value={'JANSSEN'}>얀센</MenuItem>
          <MenuItem value={'MODERNA'}>모더나</MenuItem>
          <MenuItem value={'PFIZER'}>화이자</MenuItem>
          <MenuItem value={'BOOSTER'}>부스터</MenuItem>
      </Select>
      </FormControl>
      <TextField id="post-title" label="제목" placeholder='제목을 입력해 주세요' variant="outlined" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}/>
      <TextField id="post-content" label="접종후기" placeholder='내용을 입력해 주세요' multiline rows={10} value={contentValue} onChange={(e) => setContentValue(e.target.value)}/>
      <Box
        sx={{width:150,height:150, display:'flex',
            ' & > * ': {
                width:'100%',
                height:'100%',
                objectFit:'cover'
            },
        }}    
        >
        <img 
            src={ "https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"} 
            onClick={ () => fileInput.current.click() }
            alt="프로필"
        />
        { image.map((item, index) => (
            <img 
            key={index}
            src={item} 
            onClick={ () => fileInput.current.click() }
            alt="프로필"
            />
        ))
        }
      </Box>
      <input type='file' style={{display:'none'}} accept='image/jpg,impge/png,image/jpeg' name='profile_img' id="profile" multiple onChange={ onImageHandler } ref={ fileInput }/>
      <Button variant="contained" onClick={onClickSavePost}>저장</Button>
    </CommonDialog>
  )
}

export default UploadReview
