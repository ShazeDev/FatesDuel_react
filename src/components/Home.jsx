// src/components/Home.jsx
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/characterselect');
  };

  return (
    <div className="home-container">
      {/* Contenido del menú */}
      <div className="home-content">
        <h1 className='game-title'>Fate's Duel</h1>
        <div>
          <button onClick={handleNewGame} className="home-button">
            Nueva Partida
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
