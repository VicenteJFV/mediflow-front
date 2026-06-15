import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePatientHistory } from '../hooks/usePatientHistory';

describe('Pruebas para el gancho personalizado usePatientHistory', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('debería inicializar en estado de carga con un historial vacío', () => {
    // Simula una petición que queda pendiente indefinidamente
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => usePatientHistory('MF-98765'));

    expect(result.current.cargando).toBe(true);
    expect(result.current.historial).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('debería cargar el historial correctamente si la respuesta del BFF es exitosa', async () => {
    const mockHistorial = [
      {
        id: '1',
        fecha: '2026-06-15',
        tipo: 'Consulta General',
        institucion: 'Clínica San Juan',
        especialista: 'Dr. Roberto Gómez',
        diagnostico: 'Examen preventivo sano',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockHistorial,
    });

    const { result } = renderHook(() => usePatientHistory('MF-98765'));

    // Esperar a que cambie el estado de carga
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.historial).toEqual(mockHistorial);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('/api/paciente/MF-98765/historial');
  });

  it('debería establecer el estado de error si el BFF responde con un código de error HTTP', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => usePatientHistory('MF-98765'));

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.historial).toEqual([]);
    expect(result.current.error).toBe('No se pudo establecer conexión con el BFF de MediFlow. Intente nuevamente.');
  });

  it('debería establecer el estado de error ante un fallo general de red', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fallo de red'));

    const { result } = renderHook(() => usePatientHistory('MF-98765'));

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.historial).toEqual([]);
    expect(result.current.error).toBe('Fallo de red');
  });
});
