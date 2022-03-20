import './Header.scss'
import { useState, useEffect } from 'react';
import Signup from 'pages/signup/Signup';
import Login from 'pages/login/Login';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Button} from '@mui/material';
import Profile from 'Molecules/Profile';
import Drawer from 'components/common/Drawer';
import {useSelector} from "react-redux"
import { isLogined } from "components/core/util";
import CommonDialog  from 'components/common/common-dialog'

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function Header() {
    const [login, setLogin] = useState(true);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState();
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    const userData = useSelector((state) => state.common.user)

    // bell 클릭 이벤트 리스너
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    useEffect(() => {
      if (isLogined()) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    }, [])

    return (
        <div className="header">
            <div className="inner">
                {/* 로고 박스 */}
                <div className="logo_box">
                    <img src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/128/000000/external-covid-19-coronavirus-covid19-flatart-icons-solid-flatarticons.png"/>
                </div>

                {/* 헤더 오른쪽 */}
                <div className="header_right_box">
                  {
                      login === true

                      ? /* bell & profile */
                      <ul className="bell_profile_box"> 
                          <li>
                              <Profile size={ 'big' } profileImage={userData.profileImageUrl}/>
                          </li>
                          <li>
                              <Button variant="none" onClick={handleClickOpen}>
                                  <NotificationsIcon sx={{ 'color':'#fff' }}/>
                              </Button>

                              <CommonDialog
                                  openState={open}
                                  handleClose={handleClose}
                              />
                          </li>
                      </ul>

                      : /* signin & login */
                      <ul className="signup_login_box">
                          <li>
                              <Signup />
                          </li>
                          <li>
                              <Login />
                          </li>
                      </ul>
                  }

                  {/* 네비게이션 바 */}
                  <Drawer />
                </div>
            </div>
        </div>
    )
}
