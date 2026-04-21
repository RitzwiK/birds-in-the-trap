import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className={dark ? '' : 'theme-light'}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/add"      element={<AddMember />} />
            <Route path="/view"     element={<ViewMembers />} />
            <Route path="/member/:id" element={<MemberDetails />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
