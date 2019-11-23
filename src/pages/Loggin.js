import React from 'react';
import '../components/loggin/Loggin.css';
import {Link, Redirect} from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Nav from '../components/nav/Nav';
import {loginRequest, login_info_save} from '../actions/authentication';
import { useDispatch, useSelector} from 'react-redux';
import LoginField from '../components/loggin/LoginField';
import storage from '../lib/storage';

const Loggin = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication);
  const onSubmitHandler = async(email,password) => {
    await dispatch(loginRequest(email,password));
    const loginInfo = storage.get('loginInfo');
    dispatch(login_info_save(loginInfo));
  } 
 


  return (
    <div className="field_container">
    {user.status.isLoggedIn ? <Redirect to="/Home" /> : null}
      <div className="container"> 
        <LoginField onSubmitHandler={onSubmitHandler} />
        <Link to='/Home'><HomeButton/></Link>
      </div>
        <div className="navi">
            <Nav />
        </div>
    </div>
  );
};

export default Loggin;