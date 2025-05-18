'use client';

import React, { ReactNode } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

interface BoxAppSimplesProps {
  icon?: ReactNode;
  title: string;
  value: string | number;
  color?: string;
  borderColor?: string;
}

const BoxAppSimples: React.FC<BoxAppSimplesProps> = ({
  icon,
  title,
  value,
  color = 'primary.main',
  borderColor,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        borderTop: '3px solid',
        borderColor: borderColor || color,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              borderRadius: 1,
              color: color,
              backgroundColor: `${color}15`,
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      <Typography
        variant="h3"
        component="div"
        sx={{
          fontSize: '2rem',
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default BoxAppSimples; 