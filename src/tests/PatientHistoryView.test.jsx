import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PatientHistoryView } from '../components/PatientHistoryView';

describe('Pruebas para el componente presentacional PatientHistoryView', () => {
  const mockPaciente = {
    id: 'MF-98765',
    nombre: 'Juan Carlos Gómez',
    rut: '18.765.432-1',
    fechaNacimiento: '1988-08-24',
    email: 'juan.gomez@mediflow.cl',
    telefono: '+56 9 7463 8291',
    direccion: 'Avenida Apoquindo 4501, Las Condes, Santiago',
    prevision: 'Fonasa Valor B',
    tipoSangre: 'O Positivo',
  };

  const mockConsentimientos = {
    compartirHistorial: true,
    compartirResultadosLaboratorio: true,
    accesoInvestigacion: false,
    permitirRecetasElectronicas: true,
  };

  const mockHistorial = [
    {
      id: 'rec-1',
      fecha: '2026-06-15',
      tipo: 'Consulta General',
      institucion: 'Clínica San Juan',
      especialista: 'Dr. Roberto Gómez',
      diagnostico: 'Hipertensión controlada',
      detalles: {
        presionArterial: '120/80',
        peso: '78kg',
        observaciones: 'Estable con el tratamiento actual.',
      },
    },
    {
      id: 'rec-2',
      fecha: '2026-06-01',
      tipo: 'Resultados de Laboratorio',
      institucion: 'Laboratorio San José',
      especialista: 'Dra. Carolina Martínez',
      examen: 'Perfil Lipídico',
      resultados: [
        { parametro: 'Colesterol Total', valor: 210, unidad: 'mg/dL', rangoReferencia: '120-200', estado: 'ALTO' },
      ],
      notas: 'Se sugiere dieta hipograsa.',
    },
  ];

  it('debería renderizar la información demográfica del paciente correctamente', () => {
    render(
      <PatientHistoryView
        paciente={mockPaciente}
        consentimientos={mockConsentimientos}
        alToggleConsentimiento={vi.fn()}
        historial={mockHistorial}
      />
    );

    expect(screen.getByText('Juan Carlos Gómez')).toBeInTheDocument();
    expect(screen.getByText('18.765.432-1')).toBeInTheDocument();
    expect(screen.getByText('juan.gomez@mediflow.cl')).toBeInTheDocument();
    expect(screen.getByText('Fonasa Valor B')).toBeInTheDocument();
  });

  it('debería llamar al alToggleConsentimiento cuando se interactúa con los interruptores', () => {
    const mockToggle = vi.fn();
    render(
      <PatientHistoryView
        paciente={mockPaciente}
        consentimientos={mockConsentimientos}
        alToggleConsentimiento={mockToggle}
        historial={mockHistorial}
      />
    );

    const checkInvestigacion = screen.getByLabelText(/Acceso a Investigación/);
    fireEvent.click(checkInvestigacion);

    expect(mockToggle).toHaveBeenCalledWith('accesoInvestigacion');
  });

  it('debería renderizar el historial clínico completo cuando los consentimientos estén habilitados', () => {
    render(
      <PatientHistoryView
        paciente={mockPaciente}
        consentimientos={mockConsentimientos}
        alToggleConsentimiento={vi.fn()}
        historial={mockHistorial}
      />
    );

    expect(screen.getAllByText('Hipertensión controlada')[0]).toBeInTheDocument();
    expect(screen.getByText('Perfil Lipídico')).toBeInTheDocument();
    expect(screen.getByText('Colesterol Total')).toBeInTheDocument();
    expect(screen.getByText('ALTO')).toBeInTheDocument();
  });

  it('debería bloquear el historial clínico si compartirHistorial está deshabilitado', () => {
    const consentimientosBloqueados = {
      ...mockConsentimientos,
      compartirHistorial: false,
    };

    render(
      <PatientHistoryView
        paciente={mockPaciente}
        consentimientos={consentimientosBloqueados}
        alToggleConsentimiento={vi.fn()}
        historial={mockHistorial}
      />
    );

    // No debe mostrar registros clínicos ni tablas
    expect(screen.queryAllByText('Hipertensión controlada').length).toBe(0);
    expect(screen.queryByText('Perfil Lipídico')).not.toBeInTheDocument();

    // Debe mostrar la alerta de bloqueo
    expect(screen.getByText('Acceso Restringido por el Paciente')).toBeInTheDocument();
  });

  it('debería ocultar exámenes de laboratorio específicos si compartirResultadosLaboratorio está desactivado', () => {
    const consentimientosSinLab = {
      ...mockConsentimientos,
      compartirResultadosLaboratorio: false,
    };

    render(
      <PatientHistoryView
        paciente={mockPaciente}
        consentimientos={consentimientosSinLab}
        alToggleConsentimiento={vi.fn()}
        historial={mockHistorial}
      />
    );

    // Debe mostrar el registro de consulta médica normalmente
    expect(screen.getAllByText('Hipertensión controlada')[0]).toBeInTheDocument();

    // No debe mostrar los detalles del laboratorio (tabla o colesterol)
    expect(screen.queryByText('Colesterol Total')).not.toBeInTheDocument();

    // Debe indicar que el laboratorio está bloqueado
    expect(screen.getByText('Laboratorio Bloqueado')).toBeInTheDocument();
    expect(screen.getByText(/no se muestran porque ha desactivado el consentimiento/)).toBeInTheDocument();
  });
});
