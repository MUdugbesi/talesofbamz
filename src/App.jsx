import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts';
import { Dashboard, About, Gallery, Thoughts } from './pages';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          {/* Root routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/contact' element={<Thoughts />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
