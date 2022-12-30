import axios from '../axios';
import { useForm } from 'react-hook-form';
import React from 'react';
import moment from 'moment/moment';

export const Home = ({ isAuth, user }) => {
  const [workItems, setWorkItems] = React.useState([]);
  const [searchWork, setSearchWork] = React.useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      dateFrom: '',
      dateTo: '',
    },
    mode: 'onChange',
  });
  const getWork = async (values) => {
    const dateFrom = moment.utc(values.dateFrom).format('MM-DD-YYYY');
    const dateTo = moment.utc(values.dateTo).format('MM-DD-YYYY');
    const data = await axios.post(`/api/get-work?id=${user.id}`, { dateFrom, dateTo });
    console.log(data.data);
    setWorkItems(data.data);
    setSearchWork(true);
  };
  const datas = new Date();
  const startDay = moment(moment.utc(datas) - 24 * 60 * 60 * 1000 * 7).format('YYYY-MM-DD');
  return (
    <div className='home'>
      {!isAuth && (
        <div className='home__block'>
          <h2>Авторизируйтесь чтобы начать работать</h2>
        </div>
      )}
      {isAuth && (
        <div className='home__block'>
          <form className='info-work' onSubmit={handleSubmit(getWork)}>
            <button type='submit' className='button button__get-work'>
              Получить данные о работе
            </button>
            <label htmlFor='from'>От</label>
            <input
              id='from'
              name='from'
              type='date'
              {...register('dateFrom', { required: '' })}
              min={startDay}
              max={moment().format('YYYY-MM-DD')}
              required
            />
            <label htmlFor='to'>До</label>
            <input
              id='to'
              name='to'
              type='date'
              {...register('dateTo', { required: '' })}
              min={startDay}
              max={moment().format('YYYY-MM-DD')}
              required
            />
          </form>
          <ul>
            {workItems &&
              workItems.map((obj, index) => {
                return (
                  <li key={obj.time + index}>
                    <h3>{obj.chislo.slice(0, 10)}</h3>
                    <h3>
                      Часов: {JSON.parse(obj.time).h} Минут: {JSON.parse(obj.time).m} Секунд:{' '}
                      {JSON.parse(obj.time).s}
                    </h3>
                  </li>
                );
              })}
          </ul>
          {searchWork && workItems.length === 0 && <h3 className=''>Нет результатов поиска</h3>}
        </div>
      )}
    </div>
  );
};
