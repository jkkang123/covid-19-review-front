import './Signup.scss';
import { useState, useRef, useEffect } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// Signup Component
export default function Signup() {

    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [nameValid, setNameValid] = useState("");
    const [nickNameValid, setNickNameValid] = useState("");
    const [idValid, setIdValid] = useState("");
    const [passwordValid, setPasswordValid] = useState("");
    const [passConfirmValid, setPassConfirmValid] = useState("");
    const [image, setImage] = useState("");
    const [files, setFile] = useState([]);  
    const fileInput = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [signup, setSignup] = useState(false);
    const [buttonState, setButtonState] = useState(true);

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
        setName(e.target.value);
        nameValidation();
        buttonDisabled();
    }
    const onNickNameHandler = (e) => {
        setNickName(e.target.value);
        nickNameValidation();
        buttonDisabled();
    }
    const onIdHandler = (e) => {
        setId(e.target.value);
        idValidation();
        buttonDisabled();
    }
    const onPassHandler = (e) => {
        setPassword(e.target.value);
        passValidation();
        buttonDisabled();
    }
    const onPassConfirmHandler = (e) => {
        setPassConfirm(e.target.value);
        passConfirmValidation();
        buttonDisabled();
    }

    // 유효성 검사
    const nameValidation = () => {
        let check = /[^가-힣a-zA-Z]/g; 
        if( name === '' ){
            setNameValid(false);
        } 

        if (check.test(name)) {
            setNameValid(true);
        }
    }
    const nickNameValidation = () => {
        let check = /[^가-힣a-zA-Z]/g; 
        if( nickName === '' ){
            setNickNameValid(false);
        } 
        if (check.test(nickName)) {
            setNickNameValid(true);
        }
    }
    const idValidation = () => {
        let check = /^(?=[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$).{1,80}$/; // 이메일
        if( id === '' ){
            setIdValid(false);
        } 
        if (!check.test(id)) {
            setIdValid(true);
        }
    }
    const passValidation = () => {
        let check = /^(?:(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])).{8,16}$/; 
        if( password === '' ){
            setPasswordValid(false);
        } 
        if (!check.test(password)) {
            setPasswordValid(true);
        }
    }
    const passConfirmValidation = () => {
        if( passConfirm === '' ){
            setPassConfirmValid(false);
        } 
        if (password !== passConfirm) {
            setPassConfirmValid(true);
        }
    }
    
    // Signup dialog 여닫기
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const buttonDisabled = () => {
        if( !nameValid && !nickNameValid && !idValid && !passwordValid && !passConfirmValid ){
            setButtonState(true);
        } else{
            setButtonState(false);
        }
    }

    console.log(nameValidation());
    console.log(nickNameValidation());
    /*
    console.log(idValidation);
    console.log(passValidation);
    console.log(passConfirmValidation);
    */
    
    return (
        <div className="signin">
            <Button variant="outlined" onClick={handleClickOpen}>
                Sign up
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            > 
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Sign up
                </BootstrapDialogTitle>

                {
                    signup === true

                    ? /* 회원가입을 축하합니다 */
                    <DialogContent dividers>
                        회원가입을 축하합니다.
                    </DialogContent>

                    : /* 회원가입 인풋창 */
                    <DialogContent dividers>
                        {/* 폼 */}
                        <form>
                            <div className="profile_input_wrap">
                                {/* 프로필 박스 */}
                                <div className="profile_box">
                                    {/* 이미지 박스 */}
                                    <div className="img_box">
                                        <img 
                                            src={ 
                                                image === ''
                                                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                                                : image
                                            } 
                                            onClick={ () => fileInput.current.click() }
                                            alt="프로필" 
                                        />
                                    </div>
                                    
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
                                        <AddAPhotoIcon 
                                            color="primary" 
                                            style={{fontSize:40}}
                                        />
                                    </label>
                                </div>

                                {/* 오른쪽 */}
                                <div className="right_box">
                                    {/* 이름 인풋 */}
                                    <TextField 
                                        label="이름" 
                                        type="text" 
                                        name="name" 
                                        variant="outlined"
                                        value={ name } 
                                        onChange={ onNameHandler } 
                                        required
                                        error={ nameValid }  
                                        helperText={ nameValid ? "특수기호는 입력 하실 수 없습니다." : "" } 
                                    />

                                    {/* 닉네임 인풋 */}
                                    <TextField 
                                        label="닉네임" 
                                        type="text" 
                                        name="validation" 
                                        variant="outlined"
                                        value={ nickName } 
                                        onChange={ onNickNameHandler } 
                                        required
                                        error={ nickNameValid }  
                                        helperText={ nickNameValid ? "특수기호는 입력 하실 수 없습니다.(최대 16자까지 입력가능)" : "" } 
                                    />

                                    {/* 아이디( 이메일 주소 ) 인풋 */}
                                    <TextField 
                                        label="아이디" 
                                        type="text" 
                                        name="validation" 
                                        variant="outlined"
                                        value={ id } 
                                        onChange={ onIdHandler } 
                                        required
                                        error={ idValid }  
                                        helperText={ idValid ? "이메일 주소를 입력하세요." : "" } 
                                    />

                                    {/* 비밀번호 인풋 */}
                                    <TextField 
                                        label="비밀번호" 
                                        type="password" 
                                        name="validation" 
                                        variant="outlined"
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
                                        variant="outlined"
                                        value={ passConfirm } 
                                        onChange={ onPassConfirmHandler } 
                                        required
                                        error={ passConfirmValid }  
                                        helperText={ passConfirmValid ? "비밀번호와 다릅니다." : "" } 
                                    />

                                    {/* 백신 정보 인증 버튼 */}
                                    <Button
                                        href="#"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        백신 정보 인증
                                    </Button>

                                    {/* 이메일 수신 동의 체크박스 */}
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="이메일 수신 동의" />
                                    </FormGroup>
                                </div>
                            </div>

                            {/* 회원가입 버튼 */}
                            <Button
                                href="#"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={ buttonState }
                                style={{
                                    marginTop:50,
                                }}
                            >
                                회원가입
                            </Button>
                        </form>
                    </DialogContent>
                }

                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
