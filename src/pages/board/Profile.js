import { useState, useRef, useEffect } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from '../../plugins/axios';
import {useSelector} from "react-redux"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

export default function Profile() {
    const userData = useSelector((state) => state.common.user)
    const [nickName, setNickName] = useState(userData.nickname);
    const [password, setPassword] = useState(userData.password);
    const [passConfirm, setPassConfirm] = useState("");
    const [nickNameValid, setNickNameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passConfirmValid, setPassConfirmValid] = useState(false);
    const [image, setImage] = useState("");
    const [files, setFile] = useState([]);  
    const fileInput = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [signup, setSignup] = useState(false);
    const [buttonState, setButtonState] = useState(true);

    const [Name, setName] = useState('이지은');
    const [Email, setEmail] = useState('tori@ryanlab.kr');
    const [Subject, setSubject] = useState('테스트');
    const [Message, setMessage] = useState('테스트 입니다.');

    const clickEditProfileBtn = async () => {
        const formdata = new FormData();
        formdata.append('multipartFile', files)
        const body = {
            nickname: nickName,
            password: password,
            wantToChangeProfileImage: true
        }

        try { // statusCode === 200 
            const { data } = await axios.patch('/user' + `?nickname=${nickName}&wantToChangeProfileImage=true`, formdata);
            console.log(userData); 
        } catch (e) {
            console.log(e.response); 
            // 중복 경고창
            if(e.response.data.code === "402"){
                alert(e.response.data.message);
            }
        }
    }

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
    
    console.log(userData);

    // 이미지 인풋 이벤트 핸들러
    const onImageHandler = (e) => {
        // 프로필 이미지 업로드
        if(e.target.files[0]){
            setFile(e.target.files[0])
        } 
        // 프로필 디폴트 이미지 
        else{  
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
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
    const onPassHandler = (e) => {
        const newValue = e.target.value
        setPassword(newValue);
        passValidation(newValue);
    }
    const onPassConfirmHandler = (e) => {
        const newValue = e.target.value
        setPassConfirm(e.target.value);
        passConfirmValidation(newValue);
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

    const buttonDisabled = () => {
        if( !nickNameValid && /* !passwordValid && !passConfirmValid && */ nickName /* && password && passConfirm */ ){
            setButtonState(false);
        } else {
            setButtonState(true);
        }
    }

    useEffect(()=> {
        buttonDisabled()
    },[nickNameValid,passwordValid,passConfirmValid])

    return (
        <Stack
            direction="column" 
            spacing={5} 
            alignItems="center"
            justifyContent="center"
        >
            {/* 프로필 박스 */}
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
                            ? userData.profileImageUrl
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

            {/* 이메일인증 버튼 */}
            <Button 
                autoFocus 
                onClick={ (e) => { submitHandler(e); }}
                variant="contained"
                color="primary"
                size="large"
                // disabled={ buttonState }
            >
                이메일인증
            </Button>
            
            {/* 저장하기 버튼 */}
            <Button 
                autoFocus 
                onClick={ clickEditProfileBtn }
                variant="contained"
                color="primary"
                size="large"
                disabled={ buttonState }
            >
                저장하기
            </Button>
        </Stack>
    )
}
