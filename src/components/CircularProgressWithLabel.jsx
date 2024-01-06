import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const CircularProgressWithLabel = ({ progress }) => {
  const theme = useTheme();
  const color = progress >= 70 ? theme?.palette?.success?.main : theme?.palette?.error?.main;
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
