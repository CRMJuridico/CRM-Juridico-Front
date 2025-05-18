'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Container,
  Alert,
  Collapse,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, LightMode, DarkMode } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/providers/theme-provider';
import { auth } from '@/auth';
import GoogleIcon from '@/components/icons/GoogleIcon';

export default function LoginPage() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
    setLoginError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Usuário é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.email === 'itemar' && formData.password === '1234') {
      // Se "Lembrar-me" estiver marcado, salva as credenciais
      if (rememberMe) {
        localStorage.setItem('rememberedUser', formData.email);
      } else {
        localStorage.removeItem('rememberedUser');
      }
      router.push('/dashboard');
    } else {
      setLoginError(true);
      setErrors({});
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await auth.signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        background: isDarkMode
          ? 'linear-gradient(135deg, #1a1c2e 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Elementos decorativos de fundo */}
      <Box
        sx={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(56,189,248,0.03) 0%, rgba(56,189,248,0) 70%)'
            : 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0) 70%)',
          top: '-20%',
          right: '-20%',
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '50%',
          height: '50%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(14,165,233,0.03) 0%, rgba(14,165,233,0) 70%)'
            : 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(14,165,233,0) 70%)',
          bottom: '-10%',
          left: '-10%',
          borderRadius: '50%',
        }}
      />

      {/* Botão de tema */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          },
        }}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>

      <Container maxWidth="sm">
        <Paper
          elevation={isDarkMode ? 0 : 3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: 3,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDarkMode ? '0 8px 30px rgba(0,0,0,0.3)' : '0 8px 30px rgba(0,0,0,0.1)',
            },
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              background: isDarkMode
                ? 'linear-gradient(to right, #60a5fa, #3b82f6)'
                : 'linear-gradient(to right, #2563eb, #1d4ed8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            CRM Legal
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              color: 'text.secondary',
              textAlign: 'center',
            }}
          >
            Sistema de Gestão Jurídica
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              '& .MuiTextField-root': {
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(4px)',
                },
              },
            }}
          >
            <Collapse in={loginError}>
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : undefined,
                }}
              >
                Usuário ou senha incorretos
              </Alert>
            </Collapse>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuário"
              name="email"
              autoComplete="username"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email || loginError}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode
                    ? 'rgba(30, 41, 59, 0.5)'
                    : 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password || loginError}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="start"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode
                    ? 'rgba(30, 41, 59, 0.5)'
                    : 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  sx={{
                    color: isDarkMode ? 'rgba(255,255,255,0.7)' : undefined,
                    '&.Mui-checked': {
                      color: isDarkMode ? '#60a5fa' : undefined,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                  }}
                >
                  Lembrar-me
                </Typography>
              }
              sx={{
                mt: 1,
                mb: 2,
                ml: -1,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                background: isDarkMode
                  ? 'linear-gradient(to right, #3b82f6, #2563eb)'
                  : 'linear-gradient(to right, #2563eb, #1d4ed8)',
                '&:hover': {
                  background: isDarkMode
                    ? 'linear-gradient(to right, #2563eb, #1d4ed8)'
                    : 'linear-gradient(to right, #1d4ed8, #1e40af)',
                },
              }}
            >
              Entrar
            </Button>

            <Box sx={{ width: '100%', my: 2 }}>
              <Divider>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                >
                  ou
                </Typography>
              </Divider>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                py: 1.5,
                fontSize: '0.9rem',
                textTransform: 'none',
                borderRadius: 28,
                borderColor: 'rgba(0,0,0,0.2)',
                backgroundColor: '#fff',
                color: '#3c4043',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#f8fafd',
                  borderColor: 'rgba(0,0,0,0.3)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                },
                '& .MuiButton-startIcon': {
                  marginRight: 2,
                  marginLeft: 1,
                },
              }}
            >
              Continuar com o Google
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
