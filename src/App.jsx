import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout, AuthLayout } from './layouts';
import { Dashboard, About, Gallery, Contact } from './pages';
import { AuthProvider } from './context';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}></Route>
          {/* Root routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
