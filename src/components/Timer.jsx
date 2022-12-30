import React from 'react';

export const Timer = ({ time }) => {
  return (
    <div className='timer'>
      <div className='timer__block'>
        <div className='time hour'>{time.h > 9 ? time.h : '0' + time.h}</div>
        <div className='title'>Часы</div>
      </div>
      &nbsp;:&nbsp;
      <div className='timer__block'>
        <div className='time minute'>{time.m > 9 ? time.m : '0' + time.m}</div>
        <div className='title'>Минуты</div>
      </div>
      &nbsp;:&nbsp;
      <div className='timer__block'>
        <div className='time second'>{time.s > 9 ? time.s : '0' + time.s}</div>
        <div className='title'>Секунды</div>
      </div>
      &nbsp;:&nbsp;
      <div className='timer__block'>
        <div className='time milisecond'>{time.ms > 9 ? time.ms : '0' + time.ms}</div>
        <div className='title'>Миллисекунды</div>
      </div>
    </div>
  );
};
