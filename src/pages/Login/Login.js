import './Login.scss';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Signin from 'pages/Signup/Signup';

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
import GoogleLogin from 'react-google-login';
import axios from '../../plugins/axios';
import CommonDialog from 'components/common/common-dialog';

const clientId = "583476879577-qlv0nlc974o6t99d94c6k5q3dp0qqgq8.apps.googleusercontent.com";
const clientSecret = "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";

// Login Component
export default function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [idValid, setIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [LoginOpen, setLoginOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    // 구글 소셜로그인
    const onSuccess = async(response) => {
    	console.log(response);
    
        const { googleId, profileObj : { email, name } } = response;
        
        // await onSocial({
        //     socialId : googleId,
        //     socialType : 'google',
        //     email,
        //     nickname : name
        // });
    }

    const onFailure = (error) => {
        console.log(error);
    }

    // 텍스트 인풋 이벤트 핸들러
    const onIdHandler = (e) => {
        let newValue = e.target.value;
        setId(newValue);
        idValidation(newValue);
    }
    const onPassHandler = (e) => {
        let newValue = e.target.value;
        setPassword(newValue);
        passValidation(newValue);
    }

    // 유효성 검사 
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
        if(check.test(newValue)){
            return setPasswordValid(false);
        } else{
            return setPasswordValid(true);
        }
    }

    // 버튼 활성화 핸들러
    const disabledHandler = () => {
        if(!idValid && !passwordValid && id && password){
            setDisabled(false);
        } else{
            setDisabled(true);
        }
    }

    useEffect(() => {
        disabledHandler();
    }, [idValid, passwordValid]);

    // login dialog 여닫기
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const clickLoginBtn = async () => {
        const model = {
            email: id,
            loginProvider: "ORIGINAL",
            password: password
        }
        try {
            const data = await axios.get('/login', {params: model});
            const { data } = await axios.post('/login', body);
            // window.localStorage.setItem('accesstoken', data.accesstoken)
            console.log(data)
        } catch (e) {
            console.log(e.response); 
        }
    }

    return (
        <form className="login">
            <Button variant="outlined" onClick={handleClickOpen}>
                Log in
            </Button>

            <CommonDialog
                handleClose={handleClose}
                openState={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Log in
                </DialogTitle>
                
                <DialogContent dividers>
                    {/* 로고 박스 */}
                    <div className="logo_box">
                        <img src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/128/000000/external-covid-19-coronavirus-covid19-flatart-icons-solid-flatarticons.png"/>
                    </div>

                    {/* 인풋 박스 */}
                    <div className="input_box">
                        {/* 아이디 인풋 */}
                        <TextField 
                            label="아이디" 
                            type="email" 
                            name="id" 
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
                            name="password" 
                            variant="outlined"
                            value={ password } 
                            onChange={ onPassHandler } 
                            required
                            error={ passwordValid } 
                            helperText={ passwordValid ? "최소 9자 이상 최대 16자까지 입력 • 특수문자 1개 이상 대문자 1개 이상 필수 입력" : "" } 
                        />
                    </div>

                    {/* 소셜 로그인 박스( kakao & google ) */}
                    <ul className="social_box">
                        <li>
                            <img src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/000000/external-kakaotalk-or-katalk-is-a-free-mobile-instant-messaging-application-for-smartphones-logo-bold-tal-revivo.png"/>
                        </li>
                        <li>
                            <GoogleLogin
                                clientId={clientId}
                                responseType={"id_token"}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                            />
                        </li>
                    </ul>

                    {/* 비밀번호 찾기 & Signin */}
                    <ul className="findPass_signin">
                        <li>
                            비밀번호 찾기
                        </li>
                        <li>
                            <Signin />
                        </li>
                    </ul>
                </DialogContent>

                {/* 로그인 버튼 */}
                <DialogActions>
                    <Button 
                        autoFocus 
                        onClick={clickLoginBtn}
                        href="#"
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={ disabled }
                        style={{
                            width:'100%',
                            textAlign:'center',
                        }}
                    >
                        로그인
                    </Button>
                </DialogActions>
            </CommonDialog>
        </form>
    )
}
