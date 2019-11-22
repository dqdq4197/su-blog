import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {Board, Shop, About, Loggin, Home, Poster, Signup} from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Loggin}/>
          <Route path="/home/:nick" component={Home}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/shop" exact component={Shop}/>
          <Route path="/poster" component={Poster} />
          <Route path="/Postting" component={Board} />
          <Route path="/Signup" exact component={Signup}/>
        </Switch>
      </div>
    </Router>
  );//<Route path="/shop/:id" component={ItemDetail} />
}

export default App;
