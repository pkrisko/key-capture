import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        width: 100,
        padding: 30,
    },
}));

const Index = () => {
    const router = useRouter();
    const classes = useStyles();
    useEffect(() => {
        router.push('/dashboard').then(() => {});
    }, []);
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default Index;