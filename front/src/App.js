
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Component } from 'react';
import Home from './component/homepage/homepage';
import SingleEvent from './component/SingleEvent/SingleEvent';
import Login from './component/login/login';
import Register from './component/register/register';
 

export default class App extends Component {
  render(){
    return(
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/event" element={<SingleEvent />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          </Routes>
      </Router>
    )
  }
}
