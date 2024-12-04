import React, { useState } from 'react';
import './CharacterSelect.css';
import { useNavigate } from 'react-router-dom';

function CharacterSelect() {
  const navigate = useNavigate();
  const handleMenu = () => {
    navigate('/');
  };

  // Estado para almacenar el personaje seleccionado
  const [p1CharacterType, setP1CharacterType] = useState(null);
  const [p2CharacterType, setP2CharacterType] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterClick = (character) => {
    setP1CharacterType(character);
    setSelectedCharacter(character);
    console.log("Personaje seleccionado por P1:", character);
    selectRandomCharacterForP2(); // Selección aleatoria para P2
  };

  const selectRandomCharacterForP2 = () => {
    const characters = ["MAGE", "ARCHER", "ROGUE"];
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    setP2CharacterType(randomCharacter);
    console.log("Personaje seleccionado aleatoriamente para P2:", randomCharacter);
  };

  const startGame = () => {
    console.log("Iniciar juego con:");
    console.log("Personaje P1:", p1CharacterType);
    console.log("Personaje P2:", p2CharacterType);
    if (p1CharacterType && p2CharacterType) {
      navigate(`/fight/${p1CharacterType}/${p2CharacterType}`);
    }
  };

  return (
    <div className="character-select-container">
      <h1 className='character-select-title'>Selecciona personaje</h1>
      <div className="character-container">
        <div
          className="character-sc"
          onClick={() => handleCharacterClick("MAGE")}
        >
          <img
            src="/src/assets/MageCard.png"
            alt="Personaje 1"
            className={`character-image ${selectedCharacter === "MAGE" ? "selected" : ""}`}
          />
        </div>
        <div
          className="character-sc"
          onClick={() => handleCharacterClick("ARCHER")}
        >
          <img
            src="/src/assets/ElfCard.png"
            alt="Personaje 2"
            className={`character-image ${selectedCharacter === "ARCHER" ? "selected" : ""}`}
          />
        </div>
        <div
          className="character-sc"
          onClick={() => handleCharacterClick("ROGUE")}
        >
          <img
            src="/src/assets/OrcCard.png"
            alt="Personaje 3"
            className={`character-image ${selectedCharacter === "ROGUE" ? "selected" : ""}`}
          />
        </div>
      </div>
      <div className='character-select-content'>
        <button
          onClick={startGame}
          disabled={!p1CharacterType || !p2CharacterType}
          className='character-select-button'
        >
          Iniciar partida
        </button>
        <button onClick={handleMenu} className='character-select-button'>
          Menú
        </button>
      </div>
    </div>
  );
}

export default CharacterSelect;
