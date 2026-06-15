import React, { createContext, useContext } from 'react';

// Contexto compartido por el componente compuesto
const ClinicalRecordContext = createContext();

// Hook helper para obtener el registro clínico actual en los subcomponentes
function useClinicalRecordContext() {
  const context = useContext(ClinicalRecordContext);
  if (!context) {
    throw new Error(
      'Los subcomponentes de ClinicalRecord deben usarse dentro del contenedor <ClinicalRecord />'
    );
  }
  return context;
}

// 1. Componente Contenedor Principal (Wrapper)
export function ClinicalRecord({ record, children }) {
  return (
    <ClinicalRecordContext.Provider value={record}>
      <div className="clinical-record-card">
        {children}
      </div>
    </ClinicalRecordContext.Provider>
  );
}

// 2. Subcomponente de Encabezado (Header)
ClinicalRecord.Header = function ClinicalRecordHeader() {
  const record = useClinicalRecordContext();
  
  // Asignar color de badge según el tipo de registro clínico
  const getBadgeClass = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'examen de laboratorio':
      case 'resultados de laboratorio':
        return 'badge-laboratorio';
      case 'consulta general':
        return 'badge-consulta';
      case 'receta médica':
        return 'badge-receta';
      default:
        return 'badge-defecto';
    }
  };

  return (
    <div className="clinical-record-header">
      <div className="header-meta">
        <span className="record-date">{record.fecha}</span>
        <span className={`record-badge ${getBadgeClass(record.tipo)}`}>
          {record.tipo}
        </span>
      </div>
      <h3 className="record-title">{record.examen || record.diagnostico || 'Consulta Médica'}</h3>
      <div className="record-institution">
        <strong>Institución:</strong> {record.institucion}
      </div>
    </div>
  );
};

// 3. Subcomponente de Cuerpo (Body)
ClinicalRecord.Body = function ClinicalRecordBody() {
  const record = useClinicalRecordContext();

  return (
    <div className="clinical-record-body">
      {/* Si tiene resultados de laboratorio estructurados */}
      {record.resultados && record.resultados.length > 0 ? (
        <div className="lab-results-table-container">
          <table className="lab-results-table">
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Valor</th>
                <th>Rango de Referencia</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {record.resultados.map((res, index) => {
                const esCritico = res.estado?.toUpperCase() === 'ALTO' || res.estado?.toUpperCase() === 'CRÍTICO';
                return (
                  <tr key={index} className={esCritico ? 'row-critical' : ''}>
                    <td className="param-name">{res.parametro}</td>
                    <td className="param-value font-bold">
                      {res.valor} <span className="param-unit">{res.unidad}</span>
                    </td>
                    <td className="param-range">{res.rangoReferencia}</td>
                    <td>
                      <span className={`status-pill ${esCritico ? 'status-high' : 'status-normal'}`}>
                        {res.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Renderizado para consultas médicas o diagnósticos generales */
        <div className="record-details">
          {record.diagnostico && (
            <p className="detail-item">
              <strong>Diagnóstico:</strong> {record.diagnostico}
            </p>
          )}
          {record.detalles && Object.keys(record.detalles).map((key) => {
            // Formatear las claves de detalles a palabras legibles en español
            const labels = {
              presionArterial: 'Presión Arterial',
              peso: 'Peso del Paciente',
              observaciones: 'Observaciones de la Consulta',
            };
            return (
              <p key={key} className="detail-item">
                <strong>{labels[key] || key}:</strong> {record.detalles[key]}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 4. Subcomponente de Pie (Footer)
ClinicalRecord.Footer = function ClinicalRecordFooter() {
  const record = useClinicalRecordContext();

  return (
    <div className="clinical-record-footer">
      <div className="footer-specialist">
        <strong>Especialista:</strong> {record.especialista}
      </div>
      {record.notas && (
        <div className="footer-notes">
          <strong>Indicaciones:</strong> {record.notas}
        </div>
      )}
    </div>
  );
};
