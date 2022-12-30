import { Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register/Register';
import { Home } from './pages/Home';
import { Login } from './pages/Login/Login';
import { Header } from './components/Header';
import React from 'react';
import axios from './axios';

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [user, setUser] = React.useState({});

  const logout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      setUser({});
      setIsAuth(false);
      window.localStorage.removeItem('token');
    }
  };

  const deleteAkk = () => {
    if (window.confirm('Вы действительно хотите удалить аккаунт?')) {
      axios.delete(`api/user/delete/${user.id}`);
      setIsAuth(false);
      setUser({});
      window.localStorage.removeItem('token');
      alert('Аккаунт успешно удален');
    }
  };

  React.useEffect(() => {
    async function getMe() {
      const data = await axios.get('/api/auth/me');
      if (data.data.user) {
        setUser(data.data.user);
        setIsAuth(true);
      }
      console.log(data);
    }
    getMe();
  }, []);

  return (
    <div className='wrapper'>
      <div className='container'>
        <Header deleteAkk={deleteAkk} logout={logout} user={user} isAuth={isAuth} />
        <Routes>
          <Route path='/' element={<Home user={user} isAuth={isAuth} />} exact />
          <Route
            path='/login'
            element={<Login setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth} />}
            exact
          />
          <Route path='/register' element={<Register isAuth={isAuth} />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
