import React from 'react';

export const Buttons = ({ start, stop, pause, status }) => {
  return (
    <div className='buttons'>
      {status === 0 && (
        <button onClick={start} className='button start'>
          Начать
        </button>
      )}
      {status === 1 && (
        <>
          <button onClick={pause} className='button pause'>
            Ушел курить
          </button>
          <button onClick={stop} className='button start'>
            Закончить
          </button>
        </>
      )}
      {status === 2 && (
        <>
          <button onClick={start} className='button pause'>
            Перекур окончен
          </button>
          <button onClick={stop} className='button start'>
            Закончить
          </button>
        </>
      )}
    </div>
  );
};
