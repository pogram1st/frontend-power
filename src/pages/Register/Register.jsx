import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Register.module.scss';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';

export const Register = ({ isAuth }) => {
  const [isRegister, setIsRegister] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      FirstName: '',
      LastName: '',
      email: '',
      password: '',
      phone: '',
    },
    mode: 'all',
  });
  if (isAuth) {
    return <Navigate to={'/'} />;
  }
  if (isRegister) {
    return <Navigate to={'/login'} />;
  }
  const onSubmit = async (values) => {
    const data = await axios.post('/api/auth/register', values);
    console.log(data.data);
    if (data.data.user) {
      alert('Вы успешно зарегестрированы');
      setIsRegister(true);
    } else {
      alert(data.data.message);
    }
  };
  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h5>Создание аккаунта</h5>
        <div className={styles.avatar}>
          <img width={50} src='./img/default_logo_user.png' alt='' />
        </div>
        <input
          className={styles.input1}
          placeholder='Имя'
          type='text'
          {...register('FirstName', { required: 'Укажите имя' })}
        />
        {errors.FirstName && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.FirstName.message}
          </p>
        )}
        <input
          className={styles.input1}
          placeholder='Фамилия'
          type='text'
          {...register('LastName', { required: 'Укажите фамилию' })}
        />
        {errors.LastName && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.LastName.message}
          </p>
        )}
        <input
          className={styles.input1}
          placeholder='Отчество'
          type='text'
          {...register('MiddleName', { required: 'Укажите отчество' })}
        />
        {errors.MiddleName && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.MiddleName.message}
          </p>
        )}
        <input
          className={styles.input2}
          placeholder='E-Mail'
          type={'email'}
          {...register('email', { required: 'Укажите E-mail' })}
        />
        {errors.email && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.email.message}
          </p>
        )}
        <input
          className={styles.input2}
          placeholder='Телефон'
          type={'phone'}
          {...register('phone', { required: 'Укажите Телефон' })}
        />
        {errors.phone && (
          <p style={{ color: 'red', margin: '5px 0 5px 0', width: '100%' }}>
            {errors.phone.message}
          </p>
        )}
        <input
          className={styles.input3}
          type='password'
          {...register('password', { required: 'Укажите пароль мин. 5 символов', minLength: 5 })}
          placeholder='Пароль'
        />
        {errors.password && (
          <p style={{ color: 'red', margin: '5px 0 0 0', width: '100%' }}>
            {errors.password.message.length === 0
              ? 'Введите пароль минимум 5 cимволов'
              : errors.password.message}
          </p>
        )}
        <button type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  );
};
