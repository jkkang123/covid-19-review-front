import React, { useState, useEffect } from 'react';
import {Dialog, styled} from "@mui/material";


const CommonDialog = ({ openState, handleClose, children }) => {
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        setOpen(openState)
    }, [openState]);
    
    return (
  <>
    <Dialog
        onClose={handleClose}
        open={open}
    >
        {children}
    </Dialog>
  </>);
}

export default CommonDialog;
