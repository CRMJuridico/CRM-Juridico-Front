'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePageTitle } from '@/contexts/PageTitleContext';
import UsuarioForm from '@/views/usuarios/forms/UsuarioForm';

export default function CadastroUsuarioPage() {
  const router = useRouter();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Cadastro de Usuário');
  }, [setTitle]);

  const handleSubmit = (formData: any) => {
    // TODO: Implement API call to save user
    console.log('Form data:', formData);
    router.push('/usuarios');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%'
    }}>
      <UsuarioForm onSubmit={handleSubmit} />
    </Box>
  );
} 