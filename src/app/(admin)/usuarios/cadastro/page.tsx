'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { usePageTitle } from '@/contexts/PageTitleContext';
import { UserType, UserFormData } from '@/types/user';

const initialFormData: UserFormData = {
  fullName: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  cpf: '',
  userType: 'Lawyer',
  position: '',
  photoUrl: '',
  isActive: true,
  notificationPreferences: {
    email: true,
    push: true,
  },
};

export default function CadastroUsuarioPage() {
  const router = useRouter();
  const { setTitle } = usePageTitle();
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  useEffect(() => {
    setTitle('Cadastro de Usuário');
  }, [setTitle]);

  const handleChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.fullName) newErrors.fullName = 'Nome completo é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement API call to save user
      console.log('Form data:', formData);
      router.push('/usuarios');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* Avatar and Photo Upload */}
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Box position="relative">
              <Avatar
                src={formData.photoUrl || undefined}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                }}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>

          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome Completo"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apelido"
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Telefone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="CPF"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              error={!!errors.cpf}
              helperText={errors.cpf}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Usuário</InputLabel>
              <Select
                value={formData.userType}
                label="Tipo de Usuário"
                onChange={(e) => handleChange('userType', e.target.value)}
              >
                <MenuItem value="Admin">Administrador</MenuItem>
                <MenuItem value="Lawyer">Advogado</MenuItem>
                <MenuItem value="Intern">Estagiário</MenuItem>
                <MenuItem value="Financial">Financeiro</MenuItem>
                <MenuItem value="Secretary">Secretário(a)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cargo"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
            />
          </Grid>

          {/* Password Fields */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirmar Senha"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
            />
          </Grid>

          {/* Toggles */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                />
              }
              label="Usuário Ativo"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Preferências de Notificação
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.notificationPreferences.email}
                  onChange={(e) =>
                    handleChange('notificationPreferences', {
                      ...formData.notificationPreferences,
                      email: e.target.checked,
                    })
                  }
                />
              }
              label="Notificações por Email"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.notificationPreferences.push}
                  onChange={(e) =>
                    handleChange('notificationPreferences', {
                      ...formData.notificationPreferences,
                      push: e.target.checked,
                    })
                  }
                />
              }
              label="Notificações Push"
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => router.push('/usuarios')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 