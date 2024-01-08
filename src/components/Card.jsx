import React from 'react';
import Paper from '@mui/material/Paper';

const Card = ({ children }) => (
  <div className="mt-12 flex justify-center items-center">
    <Paper variant="outlined">
      {children}
    </Paper>
  </div>
);

export default Card;
