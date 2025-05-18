'use client'

import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { Paper } from '@mui/material'
import { Compromisso } from '@/types/agenda'

interface CalendarProps {
  compromissos: Compromisso[]
  onCompromissoClick: (compromisso: Compromisso) => void
  onDateClick: (date: Date) => void
}

export default function Calendar({ compromissos, onCompromissoClick, onDateClick }: CalendarProps) {
  const events = compromissos.map(compromisso => ({
    id: compromisso.id,
    title: compromisso.titulo,
    start: compromisso.dataInicio,
    end: compromisso.dataFim,
    backgroundColor: getEventColor(compromisso.prioridade),
    extendedProps: {
      compromisso
    }
  }))

  function getEventColor(prioridade: string) {
    switch (prioridade) {
      case 'URGENTE':
        return '#f44336' // vermelho
      case 'ALTA':
        return '#ff9800' // laranja
      case 'MEDIA':
        return '#2196f3' // azul
      case 'BAIXA':
        return '#4caf50' // verde
      default:
        return '#9e9e9e' // cinza
    }
  }

  return (
    <Paper elevation={2} sx={{ 
      pr: 2,
      pt: 2,
      pb: 2,
      pl: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale={ptBrLocale}
        events={events}
        eventClick={(info) => {
          onCompromissoClick(info.event.extendedProps.compromisso)
        }}
        dateClick={(info) => {
          onDateClick(info.date)
        }}
        height="auto"
        selectable={true}
        editable={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5], // Segunda a Sexta
          startTime: '08:00',
          endTime: '18:00',
        }}
      />
    </Paper>
  )
} 