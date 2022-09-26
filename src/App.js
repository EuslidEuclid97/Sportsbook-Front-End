/*
    File: App.js
    Brief: The main component that calls the major components in the app
    Programmer: Zack Andrews
    Date created: 09/21/2022
    Date of revision: 09/25/2022
        Revision: Deleted some unneeded code
        Author: Zack Andrews//
*/

import NavBar from './NavBar';//importing components (same for next two lines)
import Home from './Home';
import Account from './Account';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';//importing features that create routes for different pages/components

function App() {//JSX calls components
   
  return (
    <Router>
      <div className="App">
        {/*<NavBar/>*/}
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
