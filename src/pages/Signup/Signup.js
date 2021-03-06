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
            // ???????????? ?????????
            if(e.response.data.code === "402"){
                alert(e.response.data.message);
            }
        }
    }

    // ????????? ?????? ????????? ?????????
    const onImageHandler = (e) => {
        // ????????? ????????? ?????????
        if(e.target.files[0]){
            setFile(e.target.files[0])
        } 
        // ????????? ????????? ????????? 
        else{  
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
        }
        
        // ?????? ??????
        const reader = new FileReader();
        console.log(reader);
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    // ????????? ?????? ????????? ?????????
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

    // ????????? ??????
    const nameValidation = (newValue) => {
        let check = /^[???-???a-zA-Z]{1,16}$/; 
        if (check.test(newValue)) {
            setNameValid(false);
        } else{
            setNameValid(true);
        }
    }
    const nickNameValidation = (newValue) => {
        let check = /^[???-???a-zA-Z]{1,16}$/; 
        if (check.test(newValue)) {
            setNickNameValid(false);
        } else{
            setNickNameValid(true);
        }
    }
    const idValidation = (newValue) => {
        let check = /^(?=[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$).{1,80}$/; // ?????????
        if (check.test(newValue)) {
            setIdValid(false);
        } else{
            setIdValid(true);
        }
    }
    const passValidation = (newValue) => {
        let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()_+~`=\{\}\[\]|\:;"',.?/\-<>\&\\])(?!.*?[\s???-??????-??????-???]).{1,}$/; 
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
    
    // Signup dialog ?????????
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

                    ? /* ??????????????? ??????????????? */
                    <DialogContent dividers>
                        ??????????????? ???????????????.
                    </DialogContent>

                    : /* ???????????? ????????? */
                    <>
                    <DialogContent dividers>
                        <Grid container>
                            {/* ????????? ?????? */}
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
                                {/* ????????? ?????? */}
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
                                        alt="?????????"
                                    />
                                </Box>
                                
                                {/* ????????? ?????? */}
                                <input 
                                    type='file' 
                                    style={{display:'none'}}
                                    accept='image/jpg,impge/png,image/jpeg' 
                                    name='profile_img'
                                    id="profile"
                                    onChange={ onImageHandler }
                                    ref={ fileInput }
                                />

                                {/* ?????? ????????? ( ?????? ) */}
                                <label htmlFor="profile">
                                    <AddAPhotoIcon color="primary"/>
                                </label>
                            </Grid>

                            {/* ????????? */}
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
                                {/* ?????? ?????? */}
                                <TextField 
                                    label="??????" 
                                    type="text" 
                                    name="name" 
                                    variant="standard"
                                    value={ name } 
                                    onChange={ onNameHandler } 
                                    required
                                    error={ nameValid }  
                                    helperText={ nameValid ? "????????? ????????? ???????????? ??????????????? ?????????.(?????? 16????????? ????????????)" : "" } 
                                />

                                {/* ????????? ?????? */}
                                <TextField 
                                    label="?????????" 
                                    type="text" 
                                    name="validation" 
                                    variant="standard"
                                    value={ nickName } 
                                    onChange={ onNickNameHandler } 
                                    required
                                    error={ nickNameValid }  
                                    helperText={ nickNameValid ? "???????????? ????????? ???????????? ??????????????? ?????????.(?????? 16????????? ????????????)" : "" } 
                                />

                                {/* ?????????( ????????? ?????? ) ?????? */}
                                <TextField 
                                    label="?????????" 
                                    type="text" 
                                    name="validation" 
                                    variant="standard"
                                    value={ id } 
                                    onChange={ onIdHandler } 
                                    required
                                    error={ idValid }  
                                    helperText={ idValid ? "????????? ????????? ????????? ???????????????.(user@email.com)" : "" } 
                                />

                                {/* ???????????? ?????? */}
                                <TextField 
                                    label="????????????" 
                                    type="password" 
                                    name="validation" 
                                    variant="standard"
                                    value={ password } 
                                    onChange={ onPassHandler } 
                                    required
                                    error={ passwordValid } 
                                    helperText={ passwordValid ? "?????? 9??? ?????? ?????? 16????????? ?????? ??? ???????????? 1??? ?????? ????????? 1??? ?????? ?????? ??????" : "" } 
                                />

                                {/* ???????????? ?????? ?????? */}
                                <TextField 
                                    label="???????????? ??????" 
                                    type="password" 
                                    name="validation" 
                                    variant="standard"
                                    value={ passConfirm } 
                                    onChange={ onPassConfirmHandler } 
                                    required
                                    error={ passConfirmValid }  
                                    helperText={ passConfirmValid ? "??????????????? ????????????." : "" } 
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                
                    {/* ???????????? ?????? */}
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
                            ????????????
                        </Button>
                    </DialogActions>
                </>}
            </CommonDialog>
        </form>
    )
}
