'use client'

import { useEffect, useState } from 'react'
import { Container, Grid, Button } from "@mui/material"
import { Add as AddIcon } from '@mui/icons-material'
import { usePageTitle } from '@/contexts/PageTitleContext'
import Calendar from '@/components/agenda/Calendar'
import CompromissoForm from '@/components/agenda/CompromissoForm'
import { Compromisso } from '@/types/agenda'

export default function AgendaPage() {
  const { setTitle } = usePageTitle()
  const [compromissos, setCompromissos] = useState<Compromisso[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCompromisso, setSelectedCompromisso] = useState<Compromisso | undefined>()

  useEffect(() => {
    setTitle('Agenda')
    // TODO: Carregar compromissos do backend
  }, [setTitle])

  const handleCompromissoClick = (compromisso: Compromisso) => {
    setSelectedCompromisso(compromisso)
    setIsFormOpen(true)
  }

  const handleDateClick = (date: Date) => {
    setSelectedCompromisso(undefined)
    setIsFormOpen(true)
  }

  const handleSaveCompromisso = (compromisso: Partial<Compromisso>) => {
    // TODO: Implementar salvamento no backend
    console.log('Salvando compromisso:', compromisso)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedCompromisso(undefined)
              setIsFormOpen(true)
            }}
          >
            Novo Compromisso
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Calendar
            compromissos={compromissos}
            onCompromissoClick={handleCompromissoClick}
            onDateClick={handleDateClick}
          />
        </Grid>
      </Grid>

      <CompromissoForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCompromisso}
        compromisso={selectedCompromisso}
      />
    </Container>
  )
} 