'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica de logout (limpar tokens, etc)
    router.push('/login');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: '100%',
          maxWidth: '400px',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>Confirmar Saída</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LogoutOutlined
            color="error"
            sx={{
              fontSize: 40,
              mr: 2,
              opacity: 0.8,
            }}
          />
          <Typography variant="body1">Tem certeza que deseja sair do sistema?</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          startIcon={<LogoutOutlined />}
        >
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
}
