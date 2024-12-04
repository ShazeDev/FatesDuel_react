import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './FightScreen.css';

function FightScreen() {
  const { p1CharacterType, p2CharacterType } = useParams();
  const navigate = useNavigate();

  const [p1HP, setP1HP] = useState(3);
  const [p2HP, setP2HP] = useState(3);
  const [energyP1, setEnergyP1] = useState(0);
  const [energyP2, setEnergyP2] = useState(0);
  const [victoryMessage, setVictoryMessage] = useState("");
  const [p1Stats, setP1Stats] = useState({ fuerza: 0, agilidad: 0, magia: 0 });
  const [p2Stats, setP2Stats] = useState({ fuerza: 0, agilidad: 0, magia: 0 });
  const [p1Image, setP1Image] = useState('');
  const [p2Image, setP2Image] = useState('');
  const [randomStat, setRandomStat] = useState('');
  const [isDiceDisabled, setIsDiceDisabled] = useState(false);
  const [isAttackDisabled, setIsAttackDisabled] = useState(false);

  const handleMenu = () => navigate('/');

  useEffect(() => {
    switch (p1CharacterType) {
      case "MAGE":
        setP1Stats({ fuerza: 10, agilidad: 20, magia: 70 });
        setP1Image("/src/assets/MageCard.png");
        break;
      case "ARCHER":
        setP1Stats({ fuerza: 30, agilidad: 50, magia: 20 });
        setP1Image("/src/assets/ElfCard.png");
        break;
      case "ROGUE":
        setP1Stats({ fuerza: 60, agilidad: 30, magia: 10 });
        setP1Image("/src/assets/OrcCard.png");
        break;
      default:
        break;
    }

    switch (p2CharacterType) {
      case "MAGE":
        setP2Stats({ fuerza: 10, agilidad: 20, magia: 70 });
        setP2Image("/src/assets/MageCard.png");
        break;
      case "ARCHER":
        setP2Stats({ fuerza: 30, agilidad: 50, magia: 20 });
        setP2Image("/src/assets/ElfCard.png");
        break;
      case "ROGUE":
        setP2Stats({ fuerza: 60, agilidad: 30, magia: 10 });
        setP2Image("/src/assets/OrcCard.png");
        break;
      default:
        break;
    }
  }, [p1CharacterType, p2CharacterType]);

  const handleDice = () => {
    // Desactiva el botón de dado y activa el de ataque
    setIsDiceDisabled(true);
    setIsAttackDisabled(false);

    // Genera el número aleatorio inicial para cada jugador
    const p1Energy = Math.floor(Math.random() * 100) + 1;
    const p2Energy = Math.floor(Math.random() * 100) + 1;

    // Muestra el número aleatorio inicial
    setEnergyP1(p1Energy);
    setEnergyP2(p2Energy);

    // Elegir un stat aleatorio para sumar más tarde
    const stats = ["fuerza", "agilidad", "magia"];
    const randomStat = stats[Math.floor(Math.random() * stats.length)];

    // Guardar el stat elegido en el estado para mostrarlo
    setRandomStat(randomStat);

    // Espera 1 segundo antes de sumar el stat al número inicial
    setTimeout(() => {
      const p1StatValue = p1Stats[randomStat];
      const p2StatValue = p2Stats[randomStat];

      setEnergyP1((prevEnergy) => prevEnergy + p1StatValue);
      setEnergyP2((prevEnergy) => prevEnergy + p2StatValue);
    }, 1000);
  };

  const handleAttack = () => {
    // Imprimir antes del ataque
    console.log('Antes del ataque - p1HP:', p1HP, 'p2HP:', p2HP);

    // Desactivar el botón de ataque y activar el de dado
    setIsAttackDisabled(true);
    setIsDiceDisabled(false);

    // Determinar quién tiene más energía y restar vidas
    if (energyP1 > energyP2) {
      setP2HP((prevHP) => Math.max(prevHP - 1, 0));  // Nunca dejar que HP sea menor que 0
    } else if (energyP2 > energyP1) {
      setP1HP((prevHP) => Math.max(prevHP - 1, 0));  // Nunca dejar que HP sea menor que 0
    }
  };

  // UseEffect para manejar la victoria cuando se actualicen las vidas
  useEffect(() => {
    // Verifica si alguna de las vidas ha llegado a 0 y muestra el mensaje de victoria
    if (p1HP <= 0) {
      setVictoryMessage("¡Victoria del Jugador 2!");
      setIsDiceDisabled(true);
      setIsAttackDisabled(true); // Deshabilitar ambos botones
    } else if (p2HP <= 0) {
      setVictoryMessage("¡Victoria del Jugador 1!");
      setIsDiceDisabled(true);
      setIsAttackDisabled(true); // Deshabilitar ambos botones
    }
  }, [p1HP, p2HP]); // Este useEffect se ejecutará cada vez que p1HP o p2HP cambien

  const renderHearts = (hp) => (
    Array.from({ length: 3 }, (_, i) => (
      <img
        key={i}
        src="/src/assets/HeartIcon.png"
        alt="Heart"
        className={`heart ${i < hp ? 'filled' : 'empty'}`}
      />
    ))
  );

  return (
    <div className="fight-screen-container">
      <div className="character-container-fs">
        <div className="character-fs">
          <div className="stats-energy">
            <div className="P1stats">
              Fuerza: {p1Stats.fuerza}<br />
              Agilidad: {p1Stats.agilidad}<br />
              Magia: {p1Stats.magia}
            </div>
            <div className="P1energy">{energyP1}</div>
          </div>
          <img src={p1Image} alt="Personaje 1" className="character-image flipped-image" />
          <div className="hearts">{renderHearts(p1HP)}</div>
        </div>

        <div className="mid-elements">
          <h2 className={`fighting-for-text ${randomStat ? 'fade-in' : 'fade-out'}`}>
            Peleando por... {randomStat}
          </h2>
          <img src="/src/assets/badge.png" className="badge-image" alt="Badge" />
          <div className="button-container">

            <button onClick={handleDice} className="button-icon-dice" disabled={isDiceDisabled}></button>
            <button onClick={handleAttack} className="button-icon-sword" disabled={isAttackDisabled}></button>

          </div>
        </div>

        <div className="character-fs">
          <div className="stats-energy">
            <div className="P2energy">{energyP2}</div>
            <div className="P2stats">
              Fuerza: {p2Stats.fuerza}<br />
              Agilidad: {p2Stats.agilidad}<br />
              Magia: {p2Stats.magia}
            </div>
          </div>
          <img src={p2Image} alt="Personaje 2" className="character-image" />
          <div className="hearts">{renderHearts(p2HP)}</div>
        </div>
      </div>
      <div className="victory-message">{victoryMessage}</div>
      <div>

        <button
          onClick={handleMenu} className="back-button">
          Salir
        </button>

      </div>
    </div>
  );
}

export default FightScreen;