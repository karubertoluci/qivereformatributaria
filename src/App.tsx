import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import Results from './components/Results';
import NotFound from './pages/NotFound';
import Handoff from './pages/Handoff';
import { Toaster } from './components/ui/toaster';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "system"
    );
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/results/:segmentId" element={<Results />} />
            <Route path="/handoff" element={<Handoff />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
