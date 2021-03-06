import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

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
      <img src={photoURL} alt="User profile" className="user-icon" />
    </IconButton>
  </AppBar>
);

export default Header;
