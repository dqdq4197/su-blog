import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import history from './history';
import {Board, Shop, About, ItemDetail, Loggin, Home, Singup} from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Loggin}/>
          <Route path="/home" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/shop" exact component={Shop}/>
          <Route path="/shop/:id" component={ItemDetail} />
          <Route path="/Postting" component={Board} />
          <Route path="/Singup" component={Singup}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
