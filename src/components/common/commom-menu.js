import React, {useState, useEffect} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CommomMenu = ({ openMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setOpenState(false);
    };

    useEffect(() => {
        setOpenState(openMenu);
    }, [openMenu])

    return (
        <>
            
            <Menu 
                open={openState}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>

        

    )
}

export default CommomMenu;