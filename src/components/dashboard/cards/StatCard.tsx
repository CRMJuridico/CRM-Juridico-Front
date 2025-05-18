import { Box, Paper, Typography, SvgIconProps } from '@mui/material';
import { ElementType } from 'react';

interface StatCardProps {
  icon: ElementType<SvgIconProps>;
  title: string;
  value: string;
  color: string;
}

export const StatCard = ({ icon: Icon, title, value, color }: StatCardProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderTop: `4px solid ${color}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ fontSize: 40, color }} />
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
    </Paper>
  );
}; 