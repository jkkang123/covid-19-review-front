import React, {useState, useEffect} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@material-ui/core';

const CommomMenu = ({openState, anchorEl, handleClick, handleClose, AnchorNode }) => {
    return (
            <>  
            {
                AnchorNode ? 
                AnchorNode 
                : <Button onClick={handleClick}>메뉴</Button>
            }
            <Menu 
                anchorEl={anchorEl}
                open={openState}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default CommomMenu;