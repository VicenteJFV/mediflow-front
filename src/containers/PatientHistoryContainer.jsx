import React from 'react';
import { usePatient } from '../context/PatientContext';
import { usePatientHistory } from '../hooks/usePatientHistory';
import { PatientHistoryView } from '../components/PatientHistoryView';

export function PatientHistoryContainer() {
  const { paciente, consentimientos, toggleConsentimiento } = usePatient();
  const { historial, cargando, error, reintentar } = usePatientHistory(paciente.id);

  // 1. Renderizar estado de carga (Alineado con diseño premium)
  if (cargando) {
    return (
      <div className="patient-portal-loading-container">
        <div className="portal-header skeleton-header">
          <div className="skeleton-logo"></div>
          <div className="skeleton-line-title"></div>
          <div className="skeleton-line-subtitle"></div>
        </div>
        <div className="portal-grid">
          <aside className="portal-sidebar">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </aside>
          <main className="portal-main">
            <div className="skeleton-card main-skeleton"></div>
          </main>
        </div>
        <div className="loading-spinner-overlay">
          <div className="mediflow-spinner"></div>
          <p className="loading-text">Sincronizando expediente con el BFF de MediFlow...</p>
        </div>
      </div>
    );
  }

  // 2. Renderizar estado de error con opción de reintento
  if (error) {
    return (
      <div className="patient-portal-error-container">
        <header className="portal-header">
          <div className="header-brand">
            <span className="brand-logo">✙</span>
            <h1>MediFlow Portal del Paciente</h1>
          </div>
        </header>
        <div className="error-panel card-premium">
          <div className="error-icon">❌</div>
          <h2>Error de Interoperabilidad</h2>
          <p className="error-message">{error}</p>
          <p className="error-suggestion">
            No pudimos recuperar el historial clínico consolidado desde el Backend For Frontend (BFF). Verifique su conexión de red o presione el botón a continuación para reintentar la solicitud.
          </p>
          <button className="btn-retry" onClick={reintentar} type="button">
            🔄 Reintentar Carga de Historial
          </button>
        </div>
      </div>
    );
  }

  // 3. Renderizar vista de éxito
  return (
    <PatientHistoryView
      paciente={paciente}
      consentimientos={consentimientos}
      alToggleConsentimiento={toggleConsentimiento}
      historial={historial}
    />
  );
}
