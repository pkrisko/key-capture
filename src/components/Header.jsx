import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

const Header = ({ displayName, photoURL, onClick }) => (
  <AppBar position="static" className="flex-grow display-flex flex-row items-center pl-3.5">
    <div className="flex-grow text-xl">
      {displayName}
    </div>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={onClick}
      color="inherit"
    >
      <img src={photoURL} alt="User profile" className="w-10 h-10 rounded-3xl" />
    </IconButton>
  </AppBar>
);

export default Header;
