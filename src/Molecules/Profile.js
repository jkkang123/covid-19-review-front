import styled from 'styled-components';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommomMenu from '../components/common/commom-menu';

let Box = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
`;


export default function Profile({ nickName, big }) {

    const [image, setImage] = useState(true);
    const [openState, setOpenState] = useState(false)
    const handleOpen = () => {
        setOpenState(true)
    }

    return (
        <>

            <CommomMenu
                openMenu={openState}
            />
        
        <Box
        onClick={handleOpen}
        >
            {/* 프로필 사진 */}
            { 
                image

                ? /* 프로필 사진이 있을 때 */
                <div style={{
                    width: big ? 50 : 40,
                    height: big ? 50 : 40
                }}>
                    <img 
                        src="img/profile.jpg" 
                        style={{ 
                            width:'100%',
                            height:'100%',
                            objectFit:'cover',
                            borderRadius:'50%', 
                        }}
                    />
                </div>

                : /* 프로필 사진이 없을 때 */
                <AccountCircleIcon 
                    style={{
                        width: big ? 50 : 40,
                        height: big ? 50 : 40
                    }}
                />
            }

            {/* 닉네임 */}
            <p
                style={{
                    fontSize: big ? 18 : 16,
                    color:'#333'
                }}
            >
                { nickName ? '닉네임' : null }
            </p>
        </Box>
        </>
        
    )
}

// 다음을 복붙하여 프로필 모듈을 사용합니다.
// <Profile nickName={ false } big={ true }/> --> 닉네임 없음 / big 버전
// <Profile nickName={ true } big={ false }/> --> 닉네임 있음 / small 버전