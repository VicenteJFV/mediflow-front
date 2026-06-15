import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Realiza limpieza después de cada caso de prueba para evitar fugas de estado en el DOM
afterEach(() => {
  cleanup();
});
