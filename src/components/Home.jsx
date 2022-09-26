/*
    File: Home.js
    Brief: The home component that generates the sign in and sign up fields; handles
    sign in and sign up (currently limited in this because there is no DB connection)
    Programmer: Zack Andrews
    Date created: 09/21/2022
    Date of revision: 09/25/2022
        Revision: Hid navbar from home page, added  title to home page, took extra sign in/sign up fields
        off home page
        Author: Zack Andrews
*/
import { useEffect, useState } from "react";//importing hooks for managing states
import { useNavigate } from "react-router-dom";//hook for redirecting to another page upon successful sign in

const Home = () => {
    const [users, setUsers] = useState([])//temporary til we get connected to a db; state for users object 
                                            //which is composed of a username and password string

    const[password, setPassword] = useState('')/*this line and the next three lines are setting password
                                                and username states for sign in and sign up handlers
                                                respectively *///
    const[username, setUsername] = useState('')
    const[newPassword, setNewPassword] = useState('')
    const[newUsername, setNewUsername] = useState('')
    const[isPending, setIsPending] = useState(false)//bool-type state for pending status

    const history = useNavigate()//initializing this hook for directing user to another page
    
    /*useEffect hook which initializes component
    Precondition: Fires when page renders
    No real poscondition oother than a state being set (for now; this will eventually take in data for all users once we have DB connection)
    First param: arrow function setting states as needed for initial render
    Second param: empty array which ensures this hook only fires at initial render and not every render*/
    useEffect(() => {

        setUsers({Username: 'user1', Password: 'JigglyPuff'})/*next three lines are attempt to set users state
                                                                but we need DB access to store more than the most 
                                                                recent user that is being set*/
        setUsers({Username: 'user2', Password: 'Charizard'})
        setUsers({Username: 'Link', Password: 'isZelda'})
    }, [])
    
    /*Handler for sign in event
    Precondition: fires when user presses Sign In button (takes in event)
    Postcondition: Will map form submission from sign in to actual credentials from db;
                    if match is found the user is redirected to another page ('Accounts' for now
                    but subject to change) */
    const handleSignIn = (e) => {//event passed in...
        e.preventDefault();//...so that we can use this function to stay on current page
        setIsPending(true)//set state to true so user can't submit twice really fast (this triggers temporary button deactivation)
        var foundID = 0;//user ID in db with matching credentials
        console.log("Should be all users", users)//will delete this before prod; we should use this to test connection to db; will display all users from DB
        const user = {username, password}//creating user object to compare? This may be redundant
        var found = 0;//var to signal that match is/isn't found
        //will take in text from credentials field and compare to users array
        {users && users.map((oneUser) => {//if users state is set then iterate through all users (oneUsers is temp value for all users)
            if(password === oneUser.Password || username === oneUser.Username){//if credentials match...
                foundID = oneUser.UserID//...set foundID to oneUser's ID (key in DB)...
                if(!found){//might be redundant but used to guard against duplicates
                    found = 1;
                }
            }
        })}
        if(found){//needs route change possibly; if a match was found...
            found = 0;//...set found to zero (since I'm paranoid)...
            history("Accounts/" + foundID)//...redirect user to Account page based on the ID of the found credentials
        }
        else{//if no match found...
            found = 0;//......set found to zero (since I'm paranoid)...
            alert("Username or password is incorrect")//alert user
        }
        setIsPending(false)//buttons are available again
}
    /*Handler for sign in event
    Precondition: fires when user presses Sign Up button (takes in event)
    Postcondition: Same as handleSignIn, but if match is not found given credentials are placed in DB; if match is found a pop up appears
    */
    const handleSignUp = (e) => {//much of this is the same as handleSignIn
        e.preventDefault();
        setIsPending(true)
        const user = {username, password}
        var found = 0;
        {users && users.map((oneUser) => {
            if(newPassword === oneUser.Password || newUsername === oneUser.Username){
                if(!found){//if a match is found...
                    alert("Username or password is already taken")//...pop up
                    found = 1;//for later if statement
                }
            }
        })}
        console.log(users)//will delete before prod
        if(!found){//if no match found, we add user
            user.username = newUsername
            user.password = newPassword
            setUsers({Password: newUsername, Username: newPassword})//once db is established, user will be set in DB as well
        }
        found = 0;
        setIsPending(false)
        //In return statement is the JSX which is rendered to the DOM
    }

    return (  
        <div className="home">
            <h1>Bookiebuddy.com</h1>
            <div>
            <form onSubmit = {handleSignUp}>
                <h2>Sign Up</h2>
                <label>Username</label>
                <input 
                    type = "text"
                    required
                    value = {newUsername}
                    onChange = {(e) => setNewUsername(e.target.value)}
                >
                </input>
                <label>Password</label>
                <input 
                    type = "text"
                    required
                    value = {newPassword}
                    onChange = {(e) => setNewPassword(e.target.value)}
                >
                </input>
                {!isPending && <button className="signButton">Sign Up</button>}
                {isPending && <button disabled>Adding user...</button>}
            </form>
            </div>
            <div>
            <form onSubmit = {handleSignIn}>
                <h2>Sign In</h2>
                <label>Username</label>
                <input 
                    type = "text"
                    required
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                >
                </input>
                <label>Password</label>
                <input 
                    type = "text"
                    required
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                >
                </input>
                {!isPending && <button className="signButton">Sign In</button>}
                {isPending && <button disabled>Adding user...</button>}
            </form>
            </div>
        </div>
    );
}
 
export default Home;
