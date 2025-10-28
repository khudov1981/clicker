import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './Leaderboard.css';

export const  Leaderboard = ({ setShowLeaderboard, leaderboard }) => {
  return (
    <div className='Leaderboard'>
      <div className='header-leaderboard'>
        <h1 className='leaderboard-title'>Топ игроков</h1>
      </div>
      <div className='content-leaderboard'>
        <ul className='leaderboard-list'>
          {leaderboard.length > 0 ? (
            leaderboard.map((player, index) => (
              <li key={player.id}>
                <div className='leaderboard-item'>
                  <div className='leaderboard-rank'>
                    <h3 className='leaderboard-place'>{index + 1}.</h3>
                    <h3 className='leaderboard-name'>{player.firstname}</h3>
                  </div>
                  <h3 className='leaderboard-score'>{player.points}</h3>
                </div>
              </li>
            ))
          ) : (
            <p>Лидерборд загружается...</p>
          )}
        </ul>
      </div>
      <div className='footer-leaderboard'>
        <button className='btn-home' onClick={() => setShowLeaderboard(false)}>
          <FontAwesomeIcon icon={faHouse} />
        </button>
      </div>
    </div>
  );
}

Leaderboard.propTypes = {
  setShowLeaderboard: PropTypes.func.isRequired,
  leaderboard: PropTypes.array.isRequired,
};

