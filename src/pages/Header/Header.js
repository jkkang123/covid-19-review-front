import './Header.scss'
import * as React from 'react';
import Signin from 'pages/Signin/Signin';
import Login from 'pages/Login/Login';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Header() {

    const [login, setLogin] = React.useState(false);
    const [age, setAge] = React.useState('');
    
    // bell 클릭 이벤트 리스너
    const handleChange = (event) => {
        setAge(event.target.value);
    };
 
    return (
        <div className="header">
            <div className="inner">
                {/* 로고 박스 */}
                <div className="logo_box">
                    <img src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/128/000000/external-covid-19-coronavirus-covid19-flatart-icons-solid-flatarticons.png"/>
                </div>

                {/* 헤더 오른쪽 */}
                {
                    login === true

                    ? /* bell & profile */
                    <ul className="bell_profile_box"> 
                        <li>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    <NotificationsIcon id="demo-simple-select-label"/>
                                </InputLabel>

                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </li>
                        <li>
                            <AccountCircleIcon />
                        </li>
                    </ul>

                    : /* signin & login */
                    <ul className="signin_login_box">
                        <li>
                            <Signin />
                        </li>
                        <li>
                            <Login />
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}
