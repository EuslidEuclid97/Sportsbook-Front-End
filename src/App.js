import NavBar from './NavBar';
import Home from './Home';
import Account from './Account';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
   
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Routes>
            <Route exact path = "/" element = {<Home/>}></Route>
            <Route path = "/Accounts/:userID" element = {<Account/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
