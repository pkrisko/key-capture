import Image from 'next/image';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const Header = ({ displayName, photoURL, onClick }) => (
  <AppBar position="static" className="header-app-bar">
    <Typography variant="h6" className="display-name">
      {displayName}
    </Typography>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={onClick}
      color="inherit"
    >
      <Image src={photoURL} alt="User profile" className="user-icon" width={40} height={40} />
    </IconButton>
  </AppBar>
);

export default Header;
