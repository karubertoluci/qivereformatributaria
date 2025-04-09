
import React from 'react';
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
  return (
    <FormDialogProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Default route is the Index/Home page */}
            <Route path="/" element={<Index />} />
            
            {/* Results route now accessible only through direct URL navigation */}
            <Route path="/results/:segmentId" element={<ResultsPage />} />
            
            <Route path="/handoff" element={
              <>
                <Header />
                <Handoff />
              </>
            } />
            
            <Route path="*" element={
              <>
                <Header />
                <NotFound />
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
