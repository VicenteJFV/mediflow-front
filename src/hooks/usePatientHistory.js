import { useState, useEffect, useCallback } from 'react';

// Custom Hook para obtener el historial clínico de un paciente desde el BFF
export function usePatientHistory(pacienteId = 'MF-98765') {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerHistorial = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      // Petición real simulando el consumo hacia el BFF de MediFlow
      const respuesta = await fetch(`/api/paciente/${pacienteId}/historial`);
      
      if (!respuesta.ok) {
        throw new Error('No se pudo establecer conexión con el BFF de MediFlow. Intente nuevamente.');
      }
      
      const datos = await respuesta.json();
      setHistorial(datos);
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al cargar el historial clínico.');
    } finally {
      setCargando(false);
    }
  }, [pacienteId]);

  // Se ejecuta al montar el componente o cuando cambia el pacienteId
  useEffect(() => {
    obtenerHistorial();
  }, [obtenerHistorial]);

  return {
    historial,
    cargando,
    error,
    reintentar: obtenerHistorial,
  };
}
