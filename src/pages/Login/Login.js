import './Login.scss';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { saveUser } from 'redux/Actions';
import { useNavigate } from 'react-router-dom';

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
import axios from 'plugins/axios';
import CommonDialog from 'components/common/common-dialog';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { Cookies } from 'react-cookie';

export default function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [idValid, setIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [login, setLogin] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [LoginOpen, setLoginOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // 구글 소셜 로그인 
    const clientId = "676913540874-m3q98gj12mqu4ubak3noj6s1juqj4sha.apps.googleusercontent.com"; // 이건 tori@ryanlab.kr 로 받은 거
    const onSuccess = async(response) => {
        const { code } = response;
        const { data } = await axios.get(`/login/GOOGLE/callback?code=${code}`)
        window.localStorage.setItem('accessToken', data.accessToken)
        dispatch(saveUser({
            nickname: data.nickname,
            profileImageUrl: data.profileImageUrl
        }));
        setLogin(true);
        navigate(0)
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
        setId('');
        setPassword('');
    };

    const clickLoginBtn = async () => {
        const model = {
            email: id,
            loginProvider: "ORIGINAL",
            password: password
        }
        try {
            const {data} = await axios.get('/login', {params: model});
            window.localStorage.setItem('accessToken', data.accessToken)
             dispatch(saveUser({
                nickname: data.nickname,
                profileImageUrl: data.profileImageUrl
            }));
            setLogin(true);
            navigate(0)
        } catch (e) {
            console.log(e.response); 
        }
    }

    const clickLogoutBtn = () => {
        setLogin(false);
    }

    return (
        <form className="login">
            <Button variant="outlined" sx={{ color: "#fff", borderColor: '#fff' }} onClick={handleClickOpen}>
                Log in
            </Button>

            <CommonDialog
                handleClose={handleClose}
                openState={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Stack 
                        direction="row" 
                        spacing={1} 
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box sx={{ width:33, height:33 }}>
                            <img 
                                src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/128/000000/external-covid-19-coronavirus-covid19-flatart-icons-solid-flatarticons.png"
                                style={{ width:'100%' }}
                            />
                        </Box>
                        <h1 className="subtitle">Log in</h1>
                    </Stack>
                </DialogTitle>
                
                { login === false
                ? // 로그인 성공시
                <DialogContent dividers>
                    {/* 아이디 & 비밀번호 */}
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

                        {/* 비밀번호 인풋 */}
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
                        />
                    </Stack>

                    {/* 소셜 로그인 박스( naver & google ) */}
                    <ul className="social_box center">
                        {/* 네이버 소셜로그인 */}
                        <li>
                            
                        </li>
                        <li>
                            <GoogleLogin
                                clientId={clientId}
                                responseType={"code"}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                            />
                        </li>
                    </ul>
                </DialogContent>
                : // 로그인 실패시
                <div>
                    <p>로그인이 완료되었습니다.</p>

                    {/* 로그아웃 버튼 */}
                    <Button 
                        autoFocus 
                        onClick={clickLogoutBtn}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        style={{
                            width:'100%',
                            textAlign:'center',
                        }}
                    >
                        로그아웃
                    </Button>
                </div>
                }

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
