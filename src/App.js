import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {Board, Shop, About, ItemDetail, Loggin, Home} from './pages';

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
