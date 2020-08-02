import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    title: {
        flexGrow: 1,
    },
    profileIcon: {
        height: 40,
        width: 40,
        borderRadius: 20
    }
}));

const Header = ({ displayName, photoURL }) => {
    const classes = useStyles();
    return (
        <div >
            <AppBar position="static" className={classes.root}>
                <Typography variant="h6" className={classes.title}>
                    {displayName}
                </Typography>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {}}
                    color="inherit"
                >
                    <img src={photoURL} alt="User photo" className={classes.profileIcon} id="user-icon" />
                </IconButton>
            </AppBar>
        </div>
    );
}

export default Header;