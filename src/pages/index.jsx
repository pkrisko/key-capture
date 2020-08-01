import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../util/auth';

const Index = () => {
    const auth = useAuth();
    return (
        <Button>
            Hello Next!
        </Button>
    );
}

export default Index;