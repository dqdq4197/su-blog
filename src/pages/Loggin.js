import React,{useCallback} from 'react';
import '../components/loggin/Loggin.css';
import {Link, useHistory, Redirect} from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Nav from '../components/nav/Nav';
import {loginRequest} from '../actions/authentication';
import { useDispatch, useSelector} from 'react-redux';
import LoginField from '../components/loggin/LoginField';


const Loggin = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication);
  //const userpatch = useCallback(() => dispatch({type: 'AUTH_LOGIN_SUCCESS'}),[dispatch])
  //const history = useHistory();

  const onSubmitHandler = useCallback(async(email,password) => {
    await dispatch(loginRequest(email,password))
    console.log(user.status.isLoggedIn)
  },[])


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