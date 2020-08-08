import React from 'react';
import Paper from '@material-ui/core/Paper';

const Card = ({ children }) => (
  <div className="card-wrapper">
    <Paper variant="outlined">
      {children}
    </Paper>
  </div>
);

export default Card;
