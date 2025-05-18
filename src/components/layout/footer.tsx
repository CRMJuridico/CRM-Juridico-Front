'use client';

import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        bgcolor: 'background.paper',
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CRM Next.js - Todos os direitos reservados
      </Typography>
    </Box>
  );
}
