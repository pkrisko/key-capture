import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const CircularProgressWithLabel = ({ progress }) => {
  const color = progress >= 70 ? 'green' : 'red';
  return (
    <Box position="relative" display="flex" justifyContent="center" color={color}>
      <CircularProgress
        variant="static"
        color="inherit"
        value={progress}
        size={100}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="textSecondary">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
