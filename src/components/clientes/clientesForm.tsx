'use client';

import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function ClienteForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Dados do cliente:', formData);
    // Aqui você poderá futuramente enviar para uma API, salvar no banco, etc.
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="CPF"
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Data de Nascimento"
        name="dataNascimento"
        type="date"
        value={formData.dataNascimento}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Telefone"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Cadastrar Cliente
      </Button>
    </Box>
  );
}
