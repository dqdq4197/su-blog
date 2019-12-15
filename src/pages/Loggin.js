import React, {useState,useEffect} from 'react';
import '../components/loggin/Loggin.css';
import {Link,Redirect} from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import {loginRequest, login_info_save} from '../actions/authentication';
import { useDispatch, useSelector} from 'react-redux';
import LoginField from '../components/loggin/LoginField';
import SignupField from '../components/singup/SignupField';
import storage from '../lib/storage';
import styled,{keyframes} from 'styled-components';


const AuthContainer = styled.div`
  display:flex;
  height: 100vh;
  width:100%;
  overflow:hidden;
`




const Loggin = () => {

  const [active, setActive] = useState(false);
  const [formSwitch, setFormSwitch] = useState(
    {
      left:"67%",
      active:"signin"
    }
  );
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication);

  const onSubmitHandler = async(email,password) => {
    await dispatch(loginRequest(email,password));
    const loginInfo = storage.get('loginInfo');
    dispatch(login_info_save(loginInfo));
  }   
  const transClick = () => {
    formSwitch.active === "signin" ? setFormSwitch(state=> ({...state, left:0, active:"signup"})) : setFormSwitch(state=>({...state,left:"67%", active:"signin"}));
    setActive(true);
  }
  
  const toggleSwitch = keyframes`
    0% {left: ${formSwitch.left === 0 ? "67%" : 0};};
    50% {width:65%};
    100% {
      left: ${formSwitch.left}; 
      width:33%;
    };
  `
  const toggelSignin = keyframes`
    0% {opacity:0; left:50%}
    30% {opacity:0}
    100% {opacity:1; left:0 }
  `
  const toggleSignup = keyframes`
    0% {opacity:0; right:50%}
    40% {opacity:0}
    100% {opacity:1; right:0}
  `
  const Switch = styled.div`
    animation:${active ? toggleSwitch: ""} 1s ease-in-out;
    position:absolute;
    overflow:hidden;
    left: ${formSwitch.left};
    background-color:rgb(13, 72, 50);
    z-index:1000;
    height:100vh;
    width:33%;
    color: white;
    .wrapper {
      position:relative;
      top:40%;
      z-index:100;
      width:100%;
      height:100vh;
      
    }
  `  
  const SignInContainer = styled.div`
    opacity: ${formSwitch.active==="signup" ? 0 : 1}
    overflow:hidden;
    position:relative;
    top:50%;
    transform:translateY(-25%);
    flex : ${formSwitch.active ==="signin" ? 2: 1};
    width:100%;
    height:100vh;
    animation:${active && formSwitch.active==="signin" ? toggelSignin : ""} 1s ease-in-out;
  `
  const SignUpContainer = styled.div`
    opacity: ${formSwitch.active==="signin" ? 0 : 1}
    overflow:hidden;
    position:relative;
    top:50%;
    transform:translateY(-25%);
    flex:${formSwitch.active ==="signin" ? 1: 2};
    width:100%;
    height:100vh;
    animation:${active && formSwitch.active==="signup" ? toggleSignup : ""} 1s ease-in-out;
  ` 

  return (
    <AuthContainer>
       {user.status.isLoggedIn ? <Redirect to="/Home" /> : null}
      <Switch className="switch">
        <div className="wrapper">
          <h2>Welcome to my blog</h2>
          <button onClick={transClick}>전환</button>
        </div>
      </Switch>
      <SignInContainer>
        <LoginField onSubmitHandler={onSubmitHandler} />
        <Link to='/Home'><HomeButton/></Link>
      </SignInContainer>
      <SignUpContainer>
        <SignupField />
      </SignUpContainer>
    </AuthContainer>
  );
};

export default Loggin;