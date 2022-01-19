import './Signin.scss';
import { useState, useRef } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function Signin() {

    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [image, setImage] = useState("");
    const [files, setFile] = useState([]);  // ??
    
    const fileInput = useRef(null);

    // 이미지 인풋 이벤트 핸들러
    const onImageHandler = (e) => {
        // 프로필 이미지 업로드
        if(e.target.files[0]){
            setFile(e.target.files[0])
        } 
        // 프로필 디폴트 이미지 ( ?? )
        else{  
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
        }
        
        // 로딩 완료 ??
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
    }
    const onNickNameHandler = (e) => {
        setNickName(e.target.value);
    }
    const onIdHandler = (e) => {
        setId(e.target.value);
    }
    const onPassHandler = (e) => {
        setPassword(e.target.value);
    }
    const onPassConfirmHandler = (e) => {
        setPassConfirm(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    // 유효성 검사 ( check= ? 모르겠음 )
    const nameValidation = () => {
        let check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+.{1,80}$/; 
        if( name === '' ){
            return false;
        } else{
            return !(check.test(name));
        }
    }
    const nickNameValidation = () => {
        let check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+.{1,80}$/; 
        if( nickName === '' ){
            return false;
        } else{
            return !(check.test(nickName));
        }
    }
    const idValidation = () => {
        let check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+.{1,80}$/; // 이메일
        if( id === '' ){
            return false;
        } else{
            return !(check.test(id));
        }
    }
    const passValidation = () => {
        let check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+.{1,80}$/; 
        if( password === '' ){
            return false;
        } else{
            return !(check.test(password));
        }
    }
    const passConfirmValidation = () => {
        if( passConfirm === '' ){
            return false;
        }
        if( password !== passConfirm ){
            return true;
        }
    }

    return (
        <div className="signin">
            <h1>회원가입</h1>

            {/* 폼 */}
            <form onSubmit={ onSubmit } >
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
                            error={ nameValidation() }  
                            helperText={ nameValidation() ? "특수기호는 입력 하실 수 없습니다." : "" } 
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
                            error={ nickNameValidation() }  
                            helperText={ nickNameValidation() ? "특수기호는 입력 하실 수 없습니다.(최대 16자까지 입력가능)" : "" } 
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
                            error={ idValidation() }  
                            helperText={ idValidation() ? "이메일 주소를 입력하세요." : "" } 
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
                            error={ passValidation() } 
                            helperText={ passValidation() ? "최소 9자 이상 최대 16자까지 입력 • 특수문자 1개 이상 대문자 1개 이상 필수 입력" : "" } 
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
                            error={ passConfirmValidation() }  
                            helperText={ passConfirmValidation() ? "비밀번호와 다릅니다." : "" } 
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
                    style={{
                        marginTop:50
                    }}
                >
                    회원가입
                </Button>
            </form>
        </div>
    )
}
