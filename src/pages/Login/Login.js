import './Login.scss';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Signin from 'pages/Signin/Signin';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

// dialog Transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [LoginOpen, setLoginOpen] = React.useState(false);

    // 텍스트 인풋 이벤트 핸들러
    const onIdHandler = (e) => {
        setId(e.target.value);
    }
    const onPassHandler = (e) => {
        setPassword(e.target.value);
    }

    // 유효성 검사 
    const idValidation = () => {
        let check = /^(?=[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$).{1,80}$/; // 이메일
        if( id === '' ){
            return false;
        } else{
            return !(check.test(id));
        }
    }
    const passValidation = () => {
        let check = /^(?:(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])).{8,16}$/; 
        if( password === '' ){
            return false;
        } else{
            return !(check.test(password));
        }
    }

    // login dialog 여닫기
    const loginHandleClickOpen = () => {
        setLoginOpen(true);
    };
    const loginHandleClose = () => {
        setLoginOpen(false);
    };

    return (
        <div className="login">
            <Button variant="outlined" onClick={loginHandleClickOpen}>
                Log in
            </Button>

            <Dialog
                fullScreen
                open={LoginOpen}
                onClose={loginHandleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={loginHandleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            로그인
                        </Typography>
                        <Button autoFocus color="inherit" onClick={loginHandleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
            
                <div className="inner">
                    {/* 로고 박스 */}
                    <div className="logo_box">
                        <img src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/128/000000/external-covid-19-coronavirus-covid19-flatart-icons-solid-flatarticons.png"/>
                    </div>

                    {/* 폼 */}
                    <form action="" method="post">
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
                                error={ idValidation() }  
                                helperText={ idValidation() ? "이메일 주소를 입력하세요." : "" } 
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
                                error={ passValidation() } 
                                helperText={ passValidation() ? "최소 9자 이상 최대 16자까지 입력 • 특수문자 1개 이상 대문자 1개 이상 필수 입력" : "" } 
                            />
                        </div>

                        {/* 소셜 로그인 박스( kakao & google ) */}
                        <ul className="social_box">
                            <li>
                                <img src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/000000/external-kakaotalk-or-katalk-is-a-free-mobile-instant-messaging-application-for-smartphones-logo-bold-tal-revivo.png"/>
                            </li>
                            <li>
                                <img src="https://img.icons8.com/glyph-neue/64/000000/google-logo.png"/>
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

                        {/* 로그인 버튼 */}
                        <Button
                            href="#"
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            style={{
                                width:'100%',
                                marginTop:30,
                                textAlign:'center',
                            }}
                        >
                            로그인
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}
