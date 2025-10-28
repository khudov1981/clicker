import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Enquiry = ({ score, setScore, setFirstname, setLeaderboard }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!window.userId) return;

      try {
        let response = await fetch(`/users/${window.userId}`);
       
        if (response.status === 404) {
          await fetch('/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: window.userId, firstname: window.firstName }),
          });

          response = await fetch(`/users/${window.userId}`);
        }

        const userData = await response.json();
        setFirstname(userData.firstname || 'Неизвестный');
        setScore(userData.points || 0);
        setIsLoaded(true);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    if (window.userId) {
      fetchUserData();
    } else {
      window.addEventListener('userIdReady', fetchUserData);
    }

    return () => {
      window.removeEventListener('userIdReady', fetchUserData);
    };
  }, [setScore, setFirstname]);

  useEffect(() => {
    if (!isLoaded) return;

    const updateUserPoints = async () => {
      if (!window.userId) return;

      try {
        await fetch('/users/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: window.userId, points: score }),
        });
      } catch (error) {
        console.error('Ошибка при обновлении очков:', error);
      }
    };

    updateUserPoints();
  }, [score, isLoaded]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/users/leaderboard');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Ошибка при получении лидерборда:', error);
      }
    };

    fetchLeaderboard();
  }, [setLeaderboard]);

  return null;
};

Enquiry.propTypes = {
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setLeaderboard: PropTypes.func.isRequired,
  setUserRank: PropTypes.func.isRequired,
};

