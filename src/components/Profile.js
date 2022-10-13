/*
    File: Profile.js
    Brief: Component for the Profile component
    Programmer: Zack Andrews
    Date created: 10/12/2022
*/

import { Link, useNavigate, useParams } from "react-router-dom"
import { getUser } from "../services/userService"
import NavBar from "./NavBar"
/*Ideas:
    -Links/displays to past betting history
        -Games, how much, outcome
    -Sign Out Button
    -Some sort of settings? (opting into email notifications?)
    -Profile pic option??    
*/
const Profile = () => {
    /*try{
        const localAdminToken = process.env.REACT_APP_ADMIN_TOKEN;
        const user = await getUser('zanzilla@ku.edu', localAdminToken);
    }
    catch(e){
        alert(e.message);
    }*/
    return(
        <div className="profile">
            {<NavBar/>}
            <div className = "sideBar">
                <button className="profileButton">Bet History</button>
                <button className="profileButton">Settings</button>
                <button className="profileButton">Sign Out</button>
                <button className="profileButton">Delete Account</button>
            </div>
            <div className="history"></div>
        </div>
    )
}

export default Profile;