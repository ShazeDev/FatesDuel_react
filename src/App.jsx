// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CharacterSelect from './components/CharacterSelect';
import FightScreen from './components/FightScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characterselect" element={<CharacterSelect />} />
        <Route path="/fight/:p1CharacterType/:p2CharacterType" element={<FightScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
