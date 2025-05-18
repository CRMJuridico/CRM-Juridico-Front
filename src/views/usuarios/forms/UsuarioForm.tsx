'use client';

import { useState, ChangeEvent } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Divider,
  Avatar,
  SelectChangeEvent,
  Paper,
} from '@mui/material';
import { TipoUsuario } from '@/types/usuario';

interface UsuarioFormData {
  nomeCompleto: string;
  apelido: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  cpf: string;
  tipoUsuario: TipoUsuario;
  ativo: boolean;
  recebeNotificacoes: boolean;
  cargo: string;
  fotoUrl: string;
}

interface UsuarioFormProps {
  onSubmit: (data: UsuarioFormData) => void;
  initialData?: Partial<UsuarioFormData>;
}

export default function UsuarioForm({ onSubmit, initialData }: UsuarioFormProps) {
  const [formData, setFormData] = useState<UsuarioFormData>({
    nomeCompleto: '',
    apelido: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cpf: '',
    tipoUsuario: TipoUsuario.ADVOGADO,
    ativo: true,
    recebeNotificacoes: true,
    cargo: '',
    fotoUrl: '',
    ...initialData,
  });

  const handleChange = (field: keyof UsuarioFormData) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const value = 'checked' in event.target 
      ? event.target.checked 
      : event.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%'
    }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Grid container spacing={3} sx={{ flex: 1 }}>
          {/* Seção: Identificação e Autenticação */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              Identificação e Autenticação
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome Completo"
              value={formData.nomeCompleto}
              onChange={handleChange('nomeCompleto')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apelido/Nome de Exibição"
              value={formData.apelido}
              onChange={handleChange('apelido')}
              required
              helperText="Ex: Dr. João, Dra. Maria"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              helperText="Será usado para login"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="CPF"
              value={formData.cpf}
              onChange={handleChange('cpf')}
              inputProps={{ maxLength: 14 }}
              helperText="Formato: 000.000.000-00"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={formData.senha}
              onChange={handleChange('senha')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirmar Senha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange('confirmarSenha')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Telefone"
              value={formData.telefone}
              onChange={handleChange('telefone')}
              inputProps={{ maxLength: 15 }}
              helperText="Formato: (00) 00000-0000"
            />
          </Grid>

          {/* Seção: Perfil e Função */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
              Perfil e Função
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Tipo de Usuário</InputLabel>
              <Select
                value={formData.tipoUsuario}
                label="Tipo de Usuário"
                onChange={handleChange('tipoUsuario')}
              >
                <MenuItem value={TipoUsuario.ADMIN}>Administrador</MenuItem>
                <MenuItem value={TipoUsuario.ADVOGADO}>Advogado</MenuItem>
                <MenuItem value={TipoUsuario.ESTAGIARIO}>Estagiário</MenuItem>
                <MenuItem value={TipoUsuario.FINANCEIRO}>Financeiro</MenuItem>
                <MenuItem value={TipoUsuario.SECRETARIO}>Secretário</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cargo"
              value={formData.cargo}
              onChange={handleChange('cargo')}
              helperText="Ex: Advogado Sênior, Assistente Jurídico"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="URL da Foto"
              value={formData.fotoUrl}
              onChange={handleChange('fotoUrl')}
              helperText="Link para foto do perfil"
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={formData.fotoUrl}
              alt={formData.nomeCompleto}
              sx={{ width: 64, height: 64, mr: 2 }}
            />
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.ativo}
                    onChange={handleChange('ativo')}
                  />
                }
                label="Usuário Ativo"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.recebeNotificacoes}
                    onChange={handleChange('recebeNotificacoes')}
                  />
                }
                label="Recebe Notificações"
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2, 
          mt: 'auto',
          pt: 3 
        }}>
          <Button variant="outlined" onClick={() => window.history.back()}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
} 