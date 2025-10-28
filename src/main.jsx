import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';

import { init, initData, miniApp } from '@telegram-apps/sdk';

const initializeTelegramSDK = async () => {
  try {
    await init();

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      window.dispatchEvent(new Event('miniAppReady'));
    }

    initData.restore();
    initData.state();

    const user = initData.user();
    console.log('Данные пользователя:', user);

    if (user) {
      window.userId = user.id;
      window.firstName = user.first_name;

      console.log('ID пользователя:', window.userId);
      console.log('Имя пользователя:', window.firstName);

      // Ожидаем полной готовности всех данных
      window.dispatchEvent(new Event('userIdReady'));
    } else {
      console.error('Ошибка: Пользовательские данные не загружены!');
    }
  } catch (error) {
    console.error('Ошибка инициализации Telegram Mini App:', error);
  }
};

// Дожидаемся обоих событий, затем рендерим приложение
const waitForUserData = async () => {
  await new Promise((resolve) => {
    const checkReady = () => {
      if (window.userId && window.firstName && miniApp.ready.isAvailable()) {
        resolve();
      }
    };

    window.addEventListener('userIdReady', checkReady);
    window.addEventListener('miniAppReady', checkReady);

    checkReady();
  });

  createRoot(document.getElementById('root')).render(
    <StrictMode> <App /> </StrictMode>,
  );
};

initializeTelegramSDK().then(waitForUserData);