import './Signup.scss';
import { useState, useRef, useEffect } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'plugins/axios';

import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CommonDialog from 'components/common/common-dialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Signup Component
export default function Signup() {

    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [nameValid, setNameValid] = useState(false);
    const [nickNameValid, setNickNameValid] = useState(false);
    const [idValid, setIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passConfirmValid, setPassConfirmValid] = useState(false);
    const [image, setImage] = useState("");
    const [files, setFile] = useState([]);  
    const fileInput = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [signup, setSignup] = useState(false);
    const [buttonState, setButtonState] = useState(true);

    const clickSignupBtn = async () => {
        const formdata = new FormData();
        formdata.append('multipartFile', files)
        const body = {
            email: id,
            loginProvider: "ORIGINAL",
            nickname: nickName,
            password: password
        }

        try { // statusCode === 200 
            const { data } = await axios.post('/user' + `?email=${id}&loginProvider=ORIGINAL&nickname=${nickName}&password=${password}`, formdata);
            setSignup(true);
        } catch (e) {
            console.log(e.response); 
            // 중복가입 경고창
            if(e.response.data.code === "402"){
                alert(e.response.data.message);
            }
        }
    }

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
    const onNameHandler = (e) => {
        const newValue = e.target.value
        setName(newValue);
        nameValidation(name);
    }
    const onNickNameHandler = (e) => {
        const newValue = e.target.value
        setNickName(newValue);
        nickNameValidation(newValue);
    }
    const onIdHandler = (e) => {
        const newValue = e.target.value
        setId(newValue);
        idValidation(newValue);
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
    const nameValidation = (newValue) => {
        let check = /^[가-힣a-zA-Z]{1,16}$/; 
        if (check.test(newValue)) {
            setNameValid(false);
        } else{
            setNameValid(true);
        }
    }
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
        if (check.test(newValue)) {
            setIdValid(false);
        } else{
            setIdValid(true);
        }
    }
    const passValidation = (newValue) => {
        let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()_+~`=\{\}\[\]|\:;"',.?/\-<>\&\\])(?!.*?[\sㄱ-ㅎㅏ-ㅣ가-힣]).{1,}$/; 
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
    
    // Signup dialog 여닫기
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setName('');
        setNickName('');
        setId('');
        setPassword('');
        setPassConfirm('');
        setImage('');
    };

    const buttonDisabled = () => {
        if( !nameValid && !nickNameValid && !idValid && !passwordValid && !passConfirmValid && name && nickName && id && password && passConfirm ){
            setButtonState(false);
        } else {
            setButtonState(true);
        }
    }

    useEffect(()=> {
        buttonDisabled()
    },[nameValid,nickNameValid,idValid,passwordValid,passConfirmValid])
    
    return (
        <form className="signin">
            <Button variant="outlined" sx={{ color: "#fff", borderColor: '#fff' }} onClick={handleClickOpen}>
                Sign up
            </Button>

            <CommonDialog
                handleClose={handleClose}
                openState={open}
            > 
                <DialogTitle>Sign up</DialogTitle>

                {
                    signup === true

                    ? /* 회원가입을 축하합니다 */
                    <DialogContent dividers>
                        회원가입을 축하합니다.
                    </DialogContent>

                    : /* 회원가입 인풋창 */
                    <>
                    <DialogContent dividers>
                        <Grid container>
                            {/* 프로필 박스 */}
                            <Grid 
                                item  
                                xs={12}
                                sx={{
                                    position:'relative',
                                    display:'flex',
                                    alignItem:'center',
                                    justifyContent:'center',
                                    ' & > label ':{
                                        position:'absolute',
                                        bottom:0,
                                        right:'35%',
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
                                            image === ''
                                            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                                            : image
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
                            </Grid>

                            {/* 오른쪽 */}
                            <Grid 
                                item 
                                xs={12}
                                sx={{
                                    '& > *':{
                                        display:'block',
                                        width:'100%',
                                    }
                                }}
                            >
                                {/* 이름 인풋 */}
                                <TextField 
                                    label="이름" 
                                    type="text" 
                                    name="name" 
                                    variant="standard"
                                    value={ name } 
                                    onChange={ onNameHandler } 
                                    required
                                    error={ nameValid }  
                                    helperText={ nameValid ? "이름은 한글과 영문으로 이루어져야 합니다.(최대 16자까지 입력가능)" : "" } 
                                />

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

                                {/* 아이디( 이메일 주소 ) 인풋 */}
                                <TextField 
                                    label="아이디" 
                                    type="text" 
                                    name="validation" 
                                    variant="standard"
                                    value={ id } 
                                    onChange={ onIdHandler } 
                                    required
                                    error={ idValid }  
                                    helperText={ idValid ? "이메일 형식을 정확히 입력하세요.(user@email.com)" : "" } 
                                />

                                {/* 비밀번호 인풋 */}
                                <TextField 
                                    label="비밀번호" 
                                    type="password" 
                                    name="validation" 
                                    variant="standard"
                                    value={ password } 
                                    onChange={ onPassHandler } 
                                    required
                                    error={ passwordValid } 
                                    helperText={ passwordValid ? "최소 9자 이상 최대 16자까지 입력 • 특수문자 1개 이상 대문자 1개 이상 필수 입력" : "" } 
                                />

                                {/* 비밀번호 확인 인풋 */}
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
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                
                    {/* 회원가입 버튼 */}
                    <DialogActions>
                        <Button 
                            autoFocus 
                            onClick={ clickSignupBtn }
                            href="#"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={ buttonState }
                        >
                            회원가입
                        </Button>
                    </DialogActions>
                </>}
            </CommonDialog>
        </form>
    )
}
