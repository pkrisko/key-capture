import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';

const menuItems = [
  {
    label: 'Play the Keyboard',
    href: '/keyboard',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Sign Out',
    href: '/logout',
  },
];

const Header = ({ displayName, photoURL, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="flex justify-between items-center pl-3.5" style={{ flexDirection: 'row' }}>
      <div className="flex items-center gap-1">
        {photoURL && (
          <IconButton onClick={onClick}>
            <img src={photoURL} alt="User profile" className="w-10 h-10 rounded-3xl" />
          </IconButton>
        )}
        {displayName && (
          <div className="text-xl">
            {displayName}
          </div>
        )}
      </div>
      <MenuIcon onClick={(event) => setAnchorEl(event.currentTarget)} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map(({ href, label }) => (
          <MenuItem onClick={handleClose} key={href}>
            <Link href={href}>
              {label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Header;
