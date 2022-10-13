
/*
    File: NavBar.js
    Brief: NavBar component for access to different features to the site; links will redirect user once clicked
    Programmer: Zack Andrews
    Date created: 09/25/2022
*/
import {Link} from 'react-router-dom';//importing ability to make links

const NavBar = () => {//declaring component
    //JSX in return statement will be rendered to DOM//
    return (  
        <nav className="navbar">
            <h1>Bookiebuddy.com</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/Search">Search</Link>
                <Link to="/Profile">Account</Link>
            </div>
        </nav>
    );
}
 
export default NavBar;//exporting componenent so it can be imported elsewhere
