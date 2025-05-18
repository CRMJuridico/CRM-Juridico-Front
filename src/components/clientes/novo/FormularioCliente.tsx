import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface FormularioClienteProps {
  onSubmit: (event: React.FormEvent) => void;
}

export const FormularioCliente: React.FC<FormularioClienteProps> = ({ onSubmit }) => {
  const router = useRouter();

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Nome Completo" name="nome" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="CPF" name="cpf" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Email" type="email" name="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Telefone" name="telefone" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Endereço" name="endereco" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Cidade" name="cidade" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Estado" name="estado" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="CEP" name="cep" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="Observações" name="observacoes" />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => router.push('/clientes')}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}; 