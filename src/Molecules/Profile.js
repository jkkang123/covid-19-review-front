import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommonMenu from 'components/common/common-menu';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
import { logout } from 'redux/Actions';
import { Link, useNavigate } from 'react-router-dom';

let Box = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
`;

export default function Profile({ nickName, size, profileImage }) {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleClick = (event) => {
        if (size === 'big') {  
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickLogout = () => {
        dispatch(logout())
        navigate(0)
    }

    return (
        <Box>
            <CommonMenu 
                AnchorNode={
                    <Button onClick={handleClick}>
                        {/* 프로필 사진 */}
                        { 
                            profileImage
                            ? /* 프로필 사진이 있을 때 */
                            <div style={{
                                width: size === 'big' ? 50 : 40,
                                height: size === 'big' ? 50 : 40
                            }}>
                                <img 
                                    src={profileImage} 
                                    alt=''
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
                                    width: size === 'big' ? 50 : 40,
                                    height: size === 'big' ? 50 : 40
                                }}
                            />
                        }
                    </Button>
                }
                anchorEl={anchorEl}
                openState={open}
                handleClick={handleClick}
                handleClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={clickLogout}>Logout</MenuItem>
            </CommonMenu>

            {/* 닉네임 */}
            <p
                style={{
                    fontSize: size === 'big' ? 18 : 16,
                    color:'#333'
                }}
            >
                { nickName ? nickName : null }
            </p>
        </Box>  
    )
}

// 다음을 복붙하여 프로필 모듈을 사용합니다.
// <Profile nickName={ false } big={ true }/> --> 닉네임 없음 / big 버전
// <Profile nickName={ true } big={ false }/> --> 닉네임 있음 / small 버전