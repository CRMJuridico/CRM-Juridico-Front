'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Compromisso, TipoCompromisso, PrioridadeCompromisso, StatusCompromisso } from '@/types/agenda'

interface CompromissoFormProps {
  open: boolean
  onClose: () => void
  onSave: (compromisso: Partial<Compromisso>) => void
  compromisso?: Compromisso
}

export default function CompromissoForm({ open, onClose, onSave, compromisso }: CompromissoFormProps) {
  const [formData, setFormData] = useState<Partial<Compromisso>>(
    compromisso || {
      titulo: '',
      descricao: '',
      tipo: TipoCompromisso.REUNIAO,
      dataInicio: new Date(),
      dataFim: new Date(),
      prioridade: PrioridadeCompromisso.MEDIA,
      status: StatusCompromisso.PENDENTE,
      responsaveis: [],
      lembretes: []
    }
  )

  const handleChange = (field: keyof Compromisso, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {compromisso ? 'Editar Compromisso' : 'Novo Compromisso'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Título"
            value={formData.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
          />

          <TextField
            fullWidth
            label="Descrição"
            multiline
            rows={3}
            value={formData.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={formData.tipo}
                  label="Tipo"
                  onChange={(e) => handleChange('tipo', e.target.value)}
                >
                  {Object.values(TipoCompromisso).map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Prioridade</InputLabel>
                <Select
                  value={formData.prioridade}
                  label="Prioridade"
                  onChange={(e) => handleChange('prioridade', e.target.value)}
                >
                  {Object.values(PrioridadeCompromisso).map((prioridade) => (
                    <MenuItem key={prioridade} value={prioridade}>
                      {prioridade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <DateTimePicker
                  label="Data e Hora de Início"
                  value={formData.dataInicio}
                  onChange={(newValue: Date | null) => handleChange('dataInicio', newValue)}
                  slotProps={{
                    textField: { fullWidth: true }
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <DateTimePicker
                  label="Data e Hora de Término"
                  value={formData.dataFim}
                  onChange={(newValue: Date | null) => handleChange('dataFim', newValue)}
                  slotProps={{
                    textField: { fullWidth: true }
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Local"
                value={formData.local}
                onChange={(e) => handleChange('local', e.target.value)}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
} 