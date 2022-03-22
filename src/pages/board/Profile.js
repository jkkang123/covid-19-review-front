import { useState, useRef, useEffect } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ReviewCard from './components/ReviewCard'
import axios from 'plugins/axios';
import {useSelector} from "react-redux"
import './Review.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import qs from 'qs'

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CommonDialog from 'components/common/common-dialog';

import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useDispatch } from "react-redux";
import { saveUser } from 'redux/Actions';
import { useNavigate } from 'react-router-dom';

const MockData = [
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    },
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    },
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    },
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    }
]

export default function Profile() {
    const userData = useSelector((state) => state.common.user)
    const [id, setId] = useState("");
    const [idValid, setIdValid] = useState(false);
    const [nickName, setNickName] = useState(userData.nickname);
    const [password, setPassword] = useState(userData.password);
    const [passConfirm, setPassConfirm] = useState("");
    const [nickNameValid, setNickNameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passConfirmValid, setPassConfirmValid] = useState(false);
    const [image, setImage] = useState(userData.profileImageUrl);
    const [files, setFile] = useState([]);  
    const fileInput = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [signup, setSignup] = useState(false);
    const [buttonState, setButtonState] = useState(true);
    const [disabledLookUp, setDisabledLookUp] = useState(true);
    const [wantToChangeProfileImage, setWantToChangeProfileImage] = useState(false);
    const [whatIPost, setWhatIPost] = useState([]);

    const [Name, setName] = useState('이지은');
    const [Email, setEmail] = useState('tori@ryanlab.kr');
    const [Subject, setSubject] = useState('테스트');
    const [Message, setMessage] = useState('테스트 입니다.');
    const [result, setResult] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // 탭
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const clickUpdateBtn = async () => {
        const formdata = new FormData();
        formdata.append('multipartFile', files)
        const body = {
            nickname: nickName,
            profileImageUrl: image,
        }

        const model = {
            nickname: nickName,
            wantToChangeProfileImage
        }

        const params = qs.stringify(model)

        try { // statusCode === 200 
            const { data } = await axios.patch(`/user?${params}`, formdata);
            window.localStorage.setItem('accessToken', data.accessToken)
             dispatch(saveUser({
                nickname: body.nickname,
                profileImageUrl: body.profileImageUrl
            }));
        } catch (e) {
            console.log(e.response); 
        }
        setWantToChangeProfileImage(false)
    }

    const getWhatIPost = async () => {
        try {
            const {data} = await axios.get('/post');
            const whatIPost = data.pagingPostList.filter(el => el.writer === nickName)            
            setWhatIPost(whatIPost)
           
        } catch (e) {
            console.log(e.response); 
        }
    }

    const getWhatIComment = async () => {
        try {
            const {data} = await axios.get(`/post/3/comment`);
            const whatIComment = data     
            //setWhatIPost(whatIPost)
           console.log(whatIComment)
        } catch (e) {
            console.log(e.response); 
        }
    }

    /*
    const clickLookUpBtn = async (e) => {
        const obj = { user_id : id, user_email : id }
        const res = await axios('/search/pw', {
          method : 'POST',
          data : obj,
          headers: new Headers()
        })
        
        if(res.data.length === 0) {
          return alert('일치하는 데이터가 없습니다 \n다시 확인해주세요.');
        }
        return setResult(true);
    }
    */

    const submitHandler = async (e) => {
        e.preventDefault();

        axios.post('/mail/', {
            data: {
            yourname: Name,
            youremail: Email,
            yoursubject: Subject,
            yourmessage: Message
            }
        }).then((response) => {
            // 전송 뒤에 실행할 코드 작성
            console.log(response.data);
        })
    }

    // 이미지 인풋 이벤트 핸들러
    const onImageHandler = (e) => {
        // 프로필 이미지 업로드
        if(e.target.files[0]){
            setFile(e.target.files[0])
            setWantToChangeProfileImage(true)
        } 
        // 프로필 디폴트 이미지 
        else{  
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
        }
        
        // 로딩 완료
        const reader = new FileReader();
        console.log(reader);
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    // 텍스트 인풋 이벤트 핸들러
    const onNickNameHandler = (e) => {
        const newValue = e.target.value
        setNickName(newValue);
        nickNameValidation(newValue);
    }
    const onIdHandler = (e) => {
        let newValue = e.target.value;
        setId(newValue);
        idValidation(newValue);
    }
    const onPassHandler = (e) => {
        const newValue = e.target.value
        setPassword(newValue);
        passValidation(newValue);
    }

    // 유효성 검사
    const nickNameValidation = (newValue) => {
        let check = /^[가-힣a-zA-Z]{1,16}$/; 
        if (check.test(newValue)) {
            setNickNameValid(false);
        } else{
            setNickNameValid(true);
        }
    }
    const idValidation = (newValue) => {
        let check = /^(?=[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$).{1,80}$/; // 이메일
        if(check.test(newValue)){
            return setIdValid(false);
        } else{
            return setIdValid(true);
        }
    }
    const passValidation = (newValue) => {
        let check = /^(?:(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])).{8,16}$/; 
        if (check.test(newValue)) {
            setPasswordValid(false);
        } else{
            setPasswordValid(true);
        }
    }
    const passConfirmValidation = (newValue) => {
        if (password === newValue) {
            setPassConfirmValid(false);
        } else{
            setPassConfirmValid(true);
        }
    }

    // disabled
    const buttonDisabled = () => {
        if( !nickNameValid && /* !passwordValid && !passConfirmValid && */ nickName /* && password && passConfirm */ ){
            setButtonState(false);
        } else {
            setButtonState(true);
        }
    }
    const changeDisabledLookUp = () => {
        if( !idValid && id ){
            setDisabledLookUp(false);
        } else {
            setDisabledLookUp(true);
        }
    }

    // 비밀번호 찾기 dialog 여닫기
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setId('');
        setPassword('');
    };

    useEffect(()=> {
        buttonDisabled()
    },[nickNameValid,passwordValid,passConfirmValid])

    useEffect(()=> {
        changeDisabledLookUp()
    },[idValid])

    useEffect(()=> {
        getWhatIPost()
        getWhatIComment()
    },[])

    return (
           <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList sx={{ width:1200, margin:'0 auto' }} onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="계정" value="1" />
                            <Tab label="내가 쓴 글" value="2" />
                            <Tab label="내가 쓴 댓글" value="3" />
                        </TabList>
                    </Box>

                    {/* 계정 컨텐츠 */}
                    <TabPanel value="1">
                        <Stack
                            direction="column" 
                            spacing={5} 
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box
                                sx={{
                                    position:'relative',
                                    display:'flex',
                                    alignItem:'center',
                                    justifyContent:'center',
                                    ' & > label ':{
                                        position:'absolute',
                                        bottom:0,
                                        right:'-10px',
                                    }
                                }}  
                            >
                                {/* 이미지 박스 */}
                                <Box
                                    sx={{
                                        width:150,
                                        height:150,
                                        ' & > * ': {
                                            width:'100%',
                                            height:'100%',
                                            objectFit:'cover',
                                            borderRadius:'50%',
                                        },
                                    }}    
                                >
                                    <img 
                                        src={ 
                                            image
                                            ? image
                                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                        } 
                                        onClick={ () => fileInput.current.click() }
                                        alt="프로필"
                                    />
                                </Box>
                                
                                {/* 프로필 인풋 */}
                                <input 
                                    type='file' 
                                    style={{display:'none'}}
                                    accept='image/jpg,impge/png,image/jpeg' 
                                    name='profile_img'
                                    id="profile"
                                    onChange={ onImageHandler }
                                    ref={ fileInput }
                                />

                                {/* 포토 아이콘 ( 라벨 ) */}
                                <label htmlFor="profile">
                                    <AddAPhotoIcon color="primary"/>
                                </label>
                            </Box>


                            {/* 이름 & 닉네임 & 아이디 & 비밀번호 */}
                            <Stack
                                direction="column" 
                                spacing={2} 
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    '& > :not(style)': { width: '30ch', borderColor:'#1976d2' },
                                }}
                            >
                                {/* 닉네임 인풋 */}
                                <TextField 
                                    label="닉네임" 
                                    type="text" 
                                    name="validation" 
                                    variant="standard"
                                    value={ nickName } 
                                    onChange={ onNickNameHandler } 
                                    required
                                    error={ nickNameValid }  
                                    helperText={ nickNameValid ? "닉네임은 한글과 영문으로 이루어져야 합니다.(최대 16자까지 입력가능)" : "" } 
                                />

                                {/* 비밀번호 인풋 
                                <TextField 
                                    label="비밀번호" 
                                    type="password" 
                                    name="password" 
                                    variant="standard"
                                    value={ password } 
                                    onChange={ onPassHandler } 
                                    required
                                    error={ passwordValid } 
                                    helperText={ passwordValid ? "최소 9자 이상 최대 16자까지 입력 • 특수문자 1개 이상 대문자 1개 이상 필수 입력" : "" } 
                                /> */}

                                {/* 비밀번호 확인 인풋 
                                <TextField 
                                    label="비밀번호 확인" 
                                    type="password" 
                                    name="validation" 
                                    variant="standard"
                                    value={ passConfirm } 
                                    onChange={ onPassConfirmHandler } 
                                    required
                                    error={ passConfirmValid }  
                                    helperText={ passConfirmValid ? "비밀번호와 다릅니다." : "" } 
                                /> */}
                            </Stack>

                            {/* 비밀번호 찾기 */}
                            <Button 
                                autoFocus 
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleClickOpen}
                                // disabled={ buttonState }
                            >
                                비밀번호 찾기
                            </Button>

                            <CommonDialog
                                handleClose={handleClose}
                                openState={open}
                            >
                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                    비밀번호 찾기
                                </DialogTitle>
                                
                                <DialogContent dividers>
                                    <Stack
                                        direction="column" 
                                        spacing={2} 
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            '& > :not(style)': { width: '30ch', borderColor:'#1976d2' },
                                        }}
                                    >
                                        {/* 아이디 인풋 */}
                                        <TextField 
                                            label="아이디" 
                                            type="email" 
                                            name="id" 
                                            variant="standard"
                                            value={ id } 
                                            onChange={ onIdHandler } 
                                            required
                                            error={ idValid }  
                                            helperText={ idValid ? "이메일 주소를 입력하세요." : "" } 
                                        />
                                    </Stack>
                                </DialogContent>

                                {/* 로그인 버튼 */}
                                <DialogActions>
                                    <Button 
                                        autoFocus 
                                        // onClick={clickLookUpBtn}
                                        href="#"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        type="submit"
                                        disabled={ disabledLookUp }
                                        style={{
                                            width:'100%',
                                            textAlign:'center',
                                        }}
                                    >
                                        조회하기
                                    </Button>
                                </DialogActions>
                            </CommonDialog>
                            
                            {/* 저장하기 버튼 */}
                            <Button 
                                autoFocus 
                                onClick={ clickUpdateBtn }
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={ buttonState }
                            >
                                저장하기
                            </Button>
                        </Stack>
                    </TabPanel>

                    {/* 내가 쓴 글 */}              
                              
                    <TabPanel
                        value="2"
                        sx={{
                            width:1200,
                            margin:'0 auto'
                        }}
                    >
                        <Grid container spacing={2}>
                            {whatIPost.map((elem, index) => 
                                <Grid item xs={12} md={6} lg={3}>
                                    <ReviewCard
                                        key={index}
                                        title={elem.title}
                                        vaccine={elem.vaccineType}
                                        profileImageUrl={elem.writerProfileImageUrl}
                                        contents={elem.content}
                                        previewImage={elem.postImageUrl}
                                        nickname={elem.writer}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </TabPanel>

                    {/* 내가 쓴 댓글 */}    
                    <TabPanel 
                        value="3"
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            width:1200, 
                            margin:'0 auto'
                        }}
                    >
                        내가 쓴 댓글
                    </TabPanel>
                </TabContext>
            </Box>
    )
}
