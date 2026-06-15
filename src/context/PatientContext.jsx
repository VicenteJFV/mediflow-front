import React, { createContext, useState, useContext } from 'react';

// Creación del contexto de paciente
const PatientContext = createContext();

// Hook personalizado para usar el contexto de paciente de forma segura
export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient debe ser utilizado dentro de un PatientProvider');
  }
  return context;
}

// Proveedor del contexto que envuelve la aplicación
export function PatientProvider({ children }) {
  // Estado inicial del paciente (demo)
  const [paciente, setPaciente] = useState({
    id: 'MF-98765',
    nombre: 'Juan Carlos Gómez',
    rut: '18.765.432-1',
    fechaNacimiento: '1988-08-24',
    email: 'juan.gomez@mediflow.cl',
    telefono: '+56 9 7463 8291',
    direccion: 'Avenida Apoquindo 4501, Las Condes, Santiago',
    prevision: 'Fonasa Valor B',
    tipoSangre: 'O Positivo',
  });

  // Estado inicial de los consentimientos dinámicos del paciente
  const [consentimientos, setConsentimientos] = useState({
    compartirHistorial: true,
    compartirResultadosLaboratorio: true,
    accesoInvestigacion: false,
    permitirRecetasElectronicas: true,
  });

  // Función para actualizar datos demográficos o generales del paciente
  const actualizarPaciente = (nuevosDatos) => {
    setPaciente((prev) => ({
      ...prev,
      ...nuevosDatos,
    }));
  };

  // Función para alternar un consentimiento específico
  const toggleConsentimiento = (idConsentimiento) => {
    setConsentimientos((prev) => ({
      ...prev,
      [idConsentimiento]: !prev[idConsentimiento],
    }));
  };

  // Función para definir un consentimiento explícitamente
  const establecerConsentimiento = (idConsentimiento, valor) => {
    setConsentimientos((prev) => ({
      ...prev,
      [idConsentimiento]: valor,
    }));
  };

  return (
    <PatientContext.Provider
      value={{
        paciente,
        consentimientos,
        actualizarPaciente,
        toggleConsentimiento,
        establecerConsentimiento,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
