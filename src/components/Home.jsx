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
import { getCreateToken, getUser, createUser } from "../services/userService";

const Home = () => {
    const[password, setPassword] = useState('')/*this line and the next three lines are setting password
                                                and username states for sign in and sign up handlers
                                                respectively *///
    const[email, setEmail] = useState('')
    const[newPassword, setNewPassword] = useState('')
    const[newEmail, setNewEmail] = useState('')
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const[isPending, setIsPending] = useState(false)//bool-type state for pending status

    const history = useNavigate()//initializing this hook for directing user to another page
    
    /*useEffect hook which initializes component
    Precondition: Fires when page renders
    No real poscondition oother than a state being set (for now; this will eventually take in data for all users once we have DB connection)
    First param: arrow function setting states as needed for initial render
    Second param: empty array which ensures this hook only fires at initial render and not every render*/
    useEffect(() => {

    }, [])
    
    /*Handler for sign in event
    Precondition: fires when user presses Sign In button (takes in event)
    Postcondition: Will map form submission from sign in to actual credentials from db;
                    if match is found the user is redirected to another page ('Accounts' for now
                    but subject to change) */
    const handleSignIn = async (e) => {//event passed in...
        e.preventDefault();//...so that we can use this function to stay on current page
        setIsPending(true);//set state to true so user can't submit twice really fast (this triggers temporary button deactivation)
        try {
            const localAdminToken = process.env.REACT_APP_ADMIN_TOKEN;
            const user = await getUser(email, localAdminToken);
            if(user?.password === password) {
                const token = await getCreateToken(email, password, localAdminToken);
                //store user in redux and token
                token && history('/landing');
            } else {
                alert("Incorrect Email or Password please try again!");
            }
        } catch (e) {
            alert(e.message);
        }
        setIsPending(false); //buttons are available again
}
    /*Handler for sign in event
    Precondition: fires when user presses Sign Up button (takes in event)
    Postcondition: Same as handleSignIn, but if match is not found given credentials are placed in DB; if match is found a pop up appears
    */
    const handleSignUp = async (e) => {//much of this is the same as handleSignIn
        setIsPending(true); //set state to true so user can't submit twice really fast (this triggers temporary button deactivation)
        e.preventDefault(); //...so that we can use this function to stay on current page
        try {
            const localAdminToken = process.env.REACT_APP_ADMIN_TOKEN;
            const user = await getUser(newEmail, localAdminToken);
            if(user) {
                alert('User is already in use, please sign in or choose a different email');
            } else {
                const newUser = {
                    firstname: newFirstName,
                    lastname: newLastName,
                    email: newEmail,
                    password: newPassword
                };
                const createResult = await createUser(newUser, localAdminToken);
                const token = await getCreateToken(newEmail, newPassword, localAdminToken);
                if(createResult && token)
                {
                    setIsPending(false);
                    history('/landing');
                }
                //store user and token in redux
            }
            setIsPending(false); //buttons are available again
        } catch (e) {
            alert(e.message);
        }
    }

    return (  
        <div className="home">
            <h1>Bookiebuddy.com</h1>
            <div>
            <form onSubmit = {handleSignUp}>
                <h2>Sign Up</h2>
                <label>Email</label>
                <input 
                    type = "text"
                    required
                    value = {newEmail}
                    onChange = {(e) => setNewEmail(e.target.value)}
                />
                <label>First Name</label>
                <input 
                    type = "text"
                    required
                    value = {newFirstName}
                    onChange = {(e) => setNewFirstName(e.target.value)}
                />
                <label>Last Name</label>
                <input 
                    type = "text"
                    required
                    value = {newLastName}
                    onChange = {(e) => setNewLastName(e.target.value)}
                />
                <label>Password</label>
                <input 
                    type = "text"
                    required
                    value = {newPassword}
                    onChange = {(e) => setNewPassword(e.target.value)}
                /> 
                {!isPending && <button className="signButton">Sign Up</button>}
                {isPending && <button disabled>Adding user...</button>}
            </form>
            </div>
            <div>
            <form onSubmit = {handleSignIn}>
                <h2>Sign In</h2>
                <label>Email</label>
                <input 
                    type = "text"
                    required
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
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
