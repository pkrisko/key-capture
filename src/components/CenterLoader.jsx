import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CenterLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <CircularProgress />
  </div>
);

export default CenterLoader;
