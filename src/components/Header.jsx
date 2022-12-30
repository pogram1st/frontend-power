import React from 'react';
import axios from '../axios';

import { Link } from 'react-router-dom';
import { Timer } from './Timer';
import { Buttons } from './Buttons';

export const Header = ({ deleteAkk, isAuth, user, logout }) => {
  const [time, setTime] = React.useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = React.useState();
  const [status, setStatus] = React.useState(0);
  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const start = () => {
    setStatus(1);
    run();
    setInterv(setInterval(run, 10));
  };
  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };
  const stop = () => {
    clearInterval(interv);
    const data = new Date().toISOString();
    console.log(data);
    axios.post('/api/work', { time, data, user_id: user.id });
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setStatus(0);
  };
  const pause = () => {
    clearInterval(interv);
    setStatus(2);
  };
  return (
    <div className='header'>
      <div className='links'>
        <Link to='/'>
          <h3>Главная</h3>
        </Link>
        {isAuth ? (
          <div className='user-block'>
            <button onClick={deleteAkk} className='button button__delete'>
              Удалить аккаунт
            </button>
            <h4>{user?.firstname}</h4>
            <button onClick={logout} className='button button__exit'>
              Выход
            </button>
          </div>
        ) : (
          <div className='auth'>
            <Link to='/register' className='button button__login'>
              Регистрация
            </Link>
            <Link to='/login' className='button button__register'>
              Вход
            </Link>
          </div>
        )}
      </div>
      {isAuth && (
        <div className='content-timer'>
          <div className='block-content'>
            <Timer time={time} />
            <Buttons pause={pause} status={status} start={start} stop={stop} />
          </div>
        </div>
      )}
    </div>
  );
};
