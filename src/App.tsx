import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // استيراد مكونات router
import Home from './pages-component/pages/Home';
import Features from './website-component/components/Features';
import Header from './website-component/components/Header';
import Hero from './website-component/components/Hero';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* صفحة الرئيسية */}
        <Routes>
          <Route 
            path="/iMbot" 
            element={
              <>
                <Header /> 
                <Hero />
                <Features />
              </>
            } 
          />
          <Route 
            path="iMbot/dashboard" 
            element={
              <>
                <Home />
              </>
            } 
          /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
