import React, {useState, useEffect} from 'react';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';

const CommomMenu = ({openState, anchorEl, handleClick, handleClose, AnchorNode, children }) => {
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
                {children}
            </Menu>
        </>
    )
}

export default CommomMenu;