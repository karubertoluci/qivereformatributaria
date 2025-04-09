
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found. Cannot mount React app.');
}

// Create a root
const root = createRoot(container);

// Clear any stored state that might cause automatic navigation to results
localStorage.removeItem('selectedSegment');
localStorage.removeItem('cnae');
localStorage.removeItem('companyData');
localStorage.removeItem('segmentArticles');

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
