import React from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.scss';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';

export const Login = ({ isAuth, setIsAuth, setUser }) => {
  const [errorAuth, setErrorAuth] = React.useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  const onSubmit = async (values) => {
    const data = await axios.post('/api/auth/login', values);
    console.log(data.data);
    if (!data.data.user) {
      setErrorAuth(true);
    } else {
      setErrorAuth(false);
      window.localStorage.setItem('token', data.data.token);
      setIsAuth(true);
      setUser(data.data.user);
    }
  };

  return (
    <div className={style.root}>
      <h2>Вход на сайт</h2>
      <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          {errorAuth && <p>Неверно введен логин или пароль</p>}
          <input
            className={style.input1}
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Укажите почту' })}
          />
          <input
            className={style.input2}
            type='password'
            placeholder='Пароль'
            {...register('password', { required: 'Укажите пароль' })}
          />
          <button type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};
