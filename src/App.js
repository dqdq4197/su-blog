import React,{useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import './App.css';
import {Board, About, Login, Home, Poster, Signup, Search , PosterModal} from './pages';
import storage from './lib/storage';
import {login_info_save} from './actions/authentication';
import {useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  
  const userInfo = async() => {
    const loginInfo = storage.get('loginInfo');
    await dispatch(login_info_save(loginInfo));
  }
useEffect(() => {
  userInfo();
},[]);

  return (
    <Router>
      <div className="App">
        <AppSwitch />
      </div>
    </Router>
  );
}

function AppSwitch() {
        const location = useLocation();
        const background = location.state && location.state.background;
  return (
      <>
        <Switch location={background || location}>
          <Route path="/" exact component={Login}/>
          <Route path="/home/:nick" component={Home}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/about/:nick" component={About}/>
          <Route path="/poster/:id/:author" component={Poster} />
          <Route path="/Postting" component={Board} />
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/Search" component={Search} />
        </Switch>
        {background && <Route path="/poster/:id/:author" component={PosterModal} />}
        
      </>
  )
}

export default App;
