import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { Leaderboard } from './components/Leaderboard'
import { Enquiry } from './API/Enquiry';

export const  App = () => {
  const [score, setScore] = useState(0);
  const [firstname, setFirstname] = useState('Загрузка...');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const handleScoreUpdate = (event) => {
      if (event.detail.points !== undefined) {
        setScore(event.detail.points);
      }
    };

    window.addEventListener('updateScore', handleScoreUpdate);
    return () => {
      window.removeEventListener('updateScore', handleScoreUpdate);
    };
  }, []);

  const handleClick = () => {
    setScore((prev) => prev + 1);
    window.dispatchEvent(new CustomEvent('updateScoreFromApp', { detail: { points: score + 1 } }));
  };

  return (
    <div className='App'>
      <h1>Коля Привет</h1>
      <Enquiry
        score={score}
        setScore={setScore}
        setFirstname={setFirstname}
        setLeaderboard={setLeaderboard}
      />
      {showLeaderboard ? (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} leaderboard={leaderboard} />
      ) : (
        <>
          <div className='header'>
            <h1 className='firstname'><span id='firstname'>{firstname}</span></h1>
          </div>
          <div className='content'>
            <div className='score-container'>
              <h2 className='score'><span id='score'>{score}</span></h2>
            </div>
            <div className='button-container'>
              <button className='button-click' onClick={handleClick}>Нажми</button>
            </div>
          </div>
          <div className='footer'>
            <button className='btn-leaderboard' onClick={() => setShowLeaderboard(true)}>
              <FontAwesomeIcon icon={faTrophy} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

