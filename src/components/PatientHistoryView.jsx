import React from 'react';
import { ClinicalRecord } from './ClinicalRecord';

export function PatientHistoryView({ paciente, consentimientos, alToggleConsentimiento, historial, alBuscarPaciente }) {
  const [buscarId, setBuscarId] = React.useState(paciente.id);

  React.useEffect(() => {
    setBuscarId(paciente.id);
  }, [paciente.id]);

  return (
    <div className="patient-portal-view">
      {/* Encabezado del Portal del Paciente */}
      <header className="portal-header">
        <div className="header-main-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div className="header-brand">
            <span className="brand-logo">✙</span>
            <h1>MediFlow Portal del Paciente</h1>
          </div>
          <div className="patient-search-bar">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (buscarId.trim() && alBuscarPaciente) {
                alBuscarPaciente(buscarId.trim());
              }
            }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={buscarId}
                onChange={(e) => setBuscarId(e.target.value)}
                placeholder="ID de Paciente (ej: MF-2)..."
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  background: '#f9f9f9',
                  color: '#333',
                  fontSize: '14px',
                  outline: 'none',
                  minWidth: '200px'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2563eb',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.background = '#2563eb'}
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
        <p className="header-subtitle">Plataforma Unificada de Interoperabilidad de Salud Digital</p>
      </header>

      <div className="portal-grid">
        {/* Columna Izquierda: Información del Paciente y Consentimientos */}
        <aside className="portal-sidebar">
          {/* Ficha del Paciente */}
          <section className="profile-section card-premium">
            <h2 className="section-title">Ficha Demográfica</h2>
            <div className="profile-details">
              <div className="profile-avatar">
                {paciente.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="profile-name-container">
                <h3 className="profile-name">{paciente.nombre}</h3>
                <span className="profile-id">ID: {paciente.id}</span>
              </div>
              
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">RUT / Identificación:</span>
                  <span className="info-value">{paciente.rut}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">F. de Nacimiento:</span>
                  <span className="info-value">{paciente.fechaNacimiento}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Grupo Sanguíneo:</span>
                  <span className="info-value">{paciente.tipoSangre}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Previsión de Salud:</span>
                  <span className="info-value previsión-badge">{paciente.prevision}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Correo Electrónico:</span>
                  <span className="info-value">{paciente.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Teléfono:</span>
                  <span className="info-value">{paciente.telefono}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Dirección:</span>
                  <span className="info-value">{paciente.direccion}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Panel de Consentimientos Dinámicos */}
          <section className="consents-section card-premium">
            <h2 className="section-title">Consentimientos Dinámicos</h2>
            <p className="consents-description">
              Controle en tiempo real qué información médica comparte con los profesionales de salud conectados a la red MediFlow.
            </p>
            <div className="consent-controls">
              {/* Compartir Historial */}
              <div className="consent-control-item">
                <label className="consent-text" htmlFor="toggle-historial">
                  <span className="consent-label">Compartir Historial Clínico</span>
                  <span className="consent-help">Permite a médicos ver consultas previas.</span>
                </label>
                <div className="switch-toggle">
                  <input
                    type="checkbox"
                    id="toggle-historial"
                    checked={consentimientos.compartirHistorial}
                    onChange={() => alToggleConsentimiento('compartirHistorial')}
                  />
                  <span className="slider-round"></span>
                </div>
              </div>

              {/* Compartir Laboratorio */}
              <div className="consent-control-item">
                <label className="consent-text" htmlFor="toggle-laboratorio">
                  <span className="consent-label">Compartir Resultados de Laboratorio</span>
                  <span className="consent-help">Permite a los especialistas ver informes químicos.</span>
                </label>
                <div className="switch-toggle">
                  <input
                    type="checkbox"
                    id="toggle-laboratorio"
                    checked={consentimientos.compartirResultadosLaboratorio}
                    onChange={() => alToggleConsentimiento('compartirResultadosLaboratorio')}
                  />
                  <span className="slider-round"></span>
                </div>
              </div>

              {/* Acceso para Investigación */}
              <div className="consent-control-item">
                <label className="consent-text" htmlFor="toggle-investigacion">
                  <span className="consent-label">Acceso a Investigación (Anónimo)</span>
                  <span className="consent-help">Aporta datos desidentificados para estudios de salud.</span>
                </label>
                <div className="switch-toggle">
                  <input
                    type="checkbox"
                    id="toggle-investigacion"
                    checked={consentimientos.accesoInvestigacion}
                    onChange={() => alToggleConsentimiento('accesoInvestigacion')}
                  />
                  <span className="slider-round"></span>
                </div>
              </div>

              {/* Permitir Recetas Electrónicas */}
              <div className="consent-control-item">
                <label className="consent-text" htmlFor="toggle-recetas">
                  <span className="consent-label">Permitir Recetas Electrónicas</span>
                  <span className="consent-help">Facilita el despacho automático de medicamentos.</span>
                </label>
                <div className="switch-toggle">
                  <input
                    type="checkbox"
                    id="toggle-recetas"
                    checked={consentimientos.permitirRecetasElectronicas}
                    onChange={() => alToggleConsentimiento('permitirRecetasElectronicas')}
                  />
                  <span className="slider-round"></span>
                </div>
              </div>
            </div>
          </section>
        </aside>

        {/* Columna Derecha: Historial Clínico Interoperable */}
        <main className="portal-main">
          <section className="history-section card-premium">
            <div className="history-header">
              <h2 className="section-title">Historial Clínico Consolidado</h2>
              <span className="record-count">{historial.length} registros cargados</span>
            </div>

            {/* Si el consentimiento de historial está apagado */}
            {!consentimientos.compartirHistorial ? (
              <div className="error-alert consent-blocked-alert">
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <h3>Acceso Restringido por el Paciente</h3>
                  <p>
                    Usted ha desactivado el consentimiento para compartir su historial clínico. Para visualizar sus registros médicos o permitir que su médico tratante acceda a ellos, active la casilla correspondiente en la barra lateral.
                  </p>
                </div>
              </div>
            ) : historial.length === 0 ? (
              <p className="no-records-text">No se encontraron registros clínicos disponibles en este momento.</p>
            ) : (
              <div className="clinical-records-list">
                {historial.map((record) => {
                  // Validar si es registro de laboratorio y el consentimiento de laboratorio está desactivado
                  const esLab = record.tipo?.toLowerCase().includes('laboratorio');
                  if (esLab && !consentimientos.compartirResultadosLaboratorio) {
                    return (
                      <div key={record.id} className="clinical-record-card record-card-blocked">
                        <div className="blocked-header">
                          <span className="record-date">{record.fecha}</span>
                          <span className="record-badge badge-laboratorio-blocked">Laboratorio Bloqueado</span>
                        </div>
                        <div className="blocked-body">
                          <p>
                            Los detalles de este examen de laboratorio (<strong>{record.examen}</strong>) no se muestran porque ha desactivado el consentimiento para compartir sus resultados químicos.
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <ClinicalRecord key={record.id} record={record}>
                      <ClinicalRecord.Header />
                      <ClinicalRecord.Body />
                      <ClinicalRecord.Footer />
                    </ClinicalRecord>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
