import React, { useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { loginUser } from './components/redux/actions/actionParamObj';

import './App.css';

const Register = lazy(() => import('./components/Registration'));
const Login = lazy(() => import('./components/Login'));
const Header = lazy(() => import('./components/includes/Headers'));
const Footer = lazy(() => import('./components/includes/Footer'));
const Blog = lazy(() => import('./components/blog'));
const Logout = lazy(() => import('./components/logout'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const CoinTransferForm = lazy(() => import('./components/coinTransferForm'));
const Auth = lazy(() => import('./components/Auth'));


function App() {

  let [users, setUsers] = useState([]);
  let [loginError, setLoginError] = useState('');
  const gState = useSelector((state) => state.userReducer);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function registerNewUser(newUser) {
    let newUserList = [...users];
    newUserList.push(newUser);
    setUsers(newUserList);
  }


  function loginHandler(userData) {
    let newUserList = [...gState.users];

    const loginUserIndex = newUserList.findIndex((element) => element.email === userData.email);

    if (loginUserIndex != '-1') {

      if (newUserList[loginUserIndex].password === userData.password) {
        // localStorage.setItem('user', JSON.stringify(newUserList[loginUserIndex]));
        dispatch(loginUser(newUserList[loginUserIndex]));
        navigate('/dashboard');
      } else {
        setLoginError('Incorrect Password');
      }

    } else {
      setLoginError('User not found');
    }

  }

  return (
    <div className="App">

      <Header />

      <Routes>
        <Route
          path='/'
          Component={() => {
            return (
              <React.Suspense  >
                <Auth authenticatedUser={gState.loggedInUser} authUser="not-allowed">
                  <Login loginHandler={loginHandler} loginError={loginError} setLoginError={setLoginError} />
                </Auth>
              </React.Suspense>
            )
          }}
          exact
        />
        <Route
          path='/dashboard'
          Component={() => {
            return (
              <React.Suspense >
                <Auth authenticatedUser={gState.loggedInUser} authUser="allowed">
                  <Dashboard />
                </Auth>
              </React.Suspense>
            )
          }}
          userList={users}
          exact
        />

        <Route
          path='/register'
          Component={() => {
            return (
              <React.Suspense>
                <Auth authenticatedUser={gState.loggedInUser} authUser="not-allowed">
                  <Register newUser={registerNewUser} />
                </Auth>
              </React.Suspense>
            )
          }}
          exact
        />
        <Route
          path='/login'
          Component={() => {
            return (
              <React.Suspense>
                <Auth authenticatedUser={gState.loggedInUser} authUser="not-allowed">
                  <Login loginHandler={loginHandler} loginError={loginError} setLoginError={setLoginError} />
                </Auth>
              </React.Suspense>
            )
          }}
          exact
        />
        <Route
          path='/logout'
          Component={() => {
            return (
              <React.Suspense>
                <Auth authenticatedUser={gState.loggedInUser} authUser="allowed">
                  <Logout />
                </Auth>
              </React.Suspense>
            )
          }}
          exact
        />
        <Route
          path='/coinTransferForm'
          Component={() => {
            return (
              <React.Suspense>
                <Auth authenticatedUser={gState.loggedInUser} authUser="allowed">
                  <CoinTransferForm />
                </Auth>
              </React.Suspense>
            )
          }}
          exact
        />
        <Route
          path='/blog'
          Component={() => {
            return (
              <React.Suspense>
                <Blog />
              </React.Suspense>
            )
          }}
          userList={users}
          exact
        />
        <Route
          path='*'
          Component={() => <h1>ERROR 404</h1>}
          exact
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
