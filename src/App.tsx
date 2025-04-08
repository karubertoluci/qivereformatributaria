
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/common/Footer';
import Index from './pages/Index';
import Results from './components/Results';
import NotFound from './pages/NotFound';
import Handoff from './pages/Handoff';
import { Toaster } from './components/ui/toaster';
import { businessSegments } from './data/segments';
import { FormDialogProvider } from './components/home/FormDialogContext';

// Wrapper component to handle route parameters for Results
const ResultsPage = () => {
  const { segmentId } = useParams();
  
  // Find the segment by ID
  const segment = businessSegments.find(s => s.id === segmentId);
  
  // If segment not found, redirect to home
  if (!segment) {
    return <Navigate to="/" />;
  }
  
  return <Results segment={segment} onBackToSegments={() => {}} />;
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "system"
    );
  }, [theme]);

  return (
    <FormDialogProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/results/:segmentId" element={<ResultsPage />} />
            <Route path="*" element={
              <>
                <Header />
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/handoff" element={<Handoff />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </>
            } />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </FormDialogProvider>
  );
}

export default App;
