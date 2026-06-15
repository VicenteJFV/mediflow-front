import React from 'react';
import { PatientProvider } from './context/PatientContext';
import { PatientHistoryContainer } from './containers/PatientHistoryContainer';
import './App.css';

function App() {
  return (
    <PatientProvider>
      <div className="app-container">
        <PatientHistoryContainer />
      </div>
    </PatientProvider>
  );
}

export default App;

