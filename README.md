# MediFlow - Portal del Paciente (Frontend)

Este repositorio contiene la interfaz del portal del paciente para **MediFlow**, una plataforma integrada y segura de interoperabilidad para salud digital. Esta aplicación de frontend está construida con **React + Vite** y consume datos clínicos desde un servicio BFF (Backend For Frontend) mediante peticiones REST.

El proyecto implementa patrones de diseño avanzados en React para garantizar la modularidad, facilidad de mantenimiento y un control granular de los consentimientos de privacidad de datos médicos.

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrese de tener instalado en su equipo:
- **Node.js** (versión 18 o superior recomendada)
- **npm** (gestor de paquetes de Node.js)

---

## 🛠️ Instalación de Dependencias

Para instalar todas las dependencias necesarias de la aplicación, incluyendo las librerías de pruebas y cobertura (`Vitest`, `React Testing Library`, `jsdom`), ejecute el siguiente comando en la raíz del proyecto:

```bash
npm install
```

---

## 💻 Ejecución del Proyecto en Desarrollo

Una vez completada la instalación, inicie el servidor de desarrollo local con:

```bash
npm run dev
```

Este comando levantará el servidor local (generalmente en `http://localhost:5173`) con soporte para recarga rápida en caliente (HMR).

---

## 🧪 Ejecución de Pruebas Unitarias y Cobertura

Para ejecutar el set completo de pruebas automatizadas y calcular la cobertura de código (con una métrica mínima exigida del 60%), utilice el comando:

```bash
npm run test
```

Este comando ejecuta **Vitest** en modo de ejecución única, imprimiendo el reporte de cobertura en la consola y generando un directorio `coverage/` con el detalle en formato HTML.

---

## 📂 Estructura de Carpetas

El código fuente principal se encuentra dentro del directorio `src/`, organizado bajo la siguiente estructura modular:

* **`/context`**: Contiene `PatientContext.jsx` que define el estado global del paciente y la gestión de sus consentimientos.
* **`/hooks`**: Contiene `usePatientHistory.js`, un hook personalizado que encapsula el consumo asíncrono hacia el BFF.
* **`/containers`**: Contiene `PatientHistoryContainer.jsx`, responsable de coordinar estados de carga, reintentos y errores del BFF.
* **`/components`**: Contiene los componentes visuales:
  * `PatientHistoryView.jsx`: Componente de presentación puro que recibe y estructura visualmente la ficha demográfica y el historial del paciente.
  * `ClinicalRecord.jsx`: Componente compuesto modular para la visualización detallada de exámenes médicos y resultados de laboratorio.
* **`/tests`**: Contiene el archivo de configuración de pruebas `setup.js` y las suites de test unitarios.

---

## ⚙️ Patrones de Diseño Utilizados

1. **Provider Pattern (Patrón Proveedor)**: 
   Utilizado en `PatientContext.jsx` para centralizar la información demográfica del paciente y sus consentimientos de privacidad de salud, evitando el paso manual de propiedades en componentes anidados (prop drilling).
   
2. **Custom Hooks (Ganchos Personalizados)**: 
   Implementado en `usePatientHistory.js` para abstraer la lógica asíncrona de llamadas `fetch` al BFF, el manejo del estado del spinner de carga, y la captura de errores.

3. **Container / Presentational (Contenedor / Presentacional)**: 
   Separación clara de responsabilidades:
   - **Contenedor (`PatientHistoryContainer.jsx`)**: Maneja la llamada de datos, estados de error y spinner de carga.
   - **Presentacional (`PatientHistoryView.jsx`)**: Recibe datos crudos a través de propiedades y los renderiza sin manejar lógica compleja.

4. **Compound Components (Componentes Compuestos)**: 
   Aplicado en `ClinicalRecord.jsx` para estructurar la visualización de los registros clínicos mediante subcomponentes especializados (`<ClinicalRecord.Header />`, `<ClinicalRecord.Body />` y `<ClinicalRecord.Footer />`) que comparten contexto internamente, brindando flexibilidad y modularidad en la renderización de informes complejos.
