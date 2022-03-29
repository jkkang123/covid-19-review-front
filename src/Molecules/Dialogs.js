import * as React from 'react';
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
import { useState } from 'react';

const bell = ['댓글(1)', '좋아요(2)'];
const profile = ['닉네임', '프로필', 'tori@ryanlab.kr', 'Log out'];

function SimpleDialog(props) {
  
  const [state, setstate] = useState([bell, profile])
  const { onClose, selectedValue, open } = props;

  console.log(props);
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>알림</DialogTitle> 

        <List sx={{ pt: 0 }}>
            {state[1].map((profile) => (
                <ListItem button onClick={() => handleListItemClick(profile)} key={profile}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={profile} />
                </ListItem>
            ))}
        </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Dialogs() {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(profile[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}
