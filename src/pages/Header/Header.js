import './Header.scss'
import * as React from 'react';
import Signup from 'pages/Signup/Signup';
import Login from 'pages/Login/Login';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Profile from 'Molecules/Profile';
import { useState } from 'react';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem button onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
  
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    );
}
  
SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function Header() {

    const [login, setLogin] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    // bell 클릭 이벤트 리스너
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
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
                            <Button variant="none" onClick={handleClickOpen}>
                                <NotificationsIcon/>
                            </Button>

                            <SimpleDialog
                                selectedValue={selectedValue}
                                open={open}
                                onClose={handleClose}
                            />
                        </li>
                        <li>
                            {/* 프로필 모듈 실험 */}
                            <Profile nickName={ false } big={ true }/>
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
            </div>
        </div>
    )
}
