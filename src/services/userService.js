import * as axios from "axios";

/*
    File: userService.js
    Brief: This will handle all service calls to our database that deals with user managment
    Programmer: Sam Weise
    Date created: 10/6/2022
*/

export const getUser = async (email, token) => {
    try{
        //Get the local admin token from environment
        const userServiceUrl = process.env.REACT_APP_BOOKIEBUDDY_SERVICE;
        //make the call to get the user with the token attached to the authorization header
        const result = await axios.get(`${userServiceUrl}func-get-user/?email=${email}`, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        });
        //Return the result
        return Promise.resolve(result?.data);
    } catch (e) {
        //If the user is not found return undefined and if there is another error reject with the error
        return e.response.status === 404 ? Promise.resolve(undefined) : Promise.reject(e);
    }
}

export const getCreateToken = async (email, password, token) => {
    try {
        //Get the local admin token from environment
        const userServiceUrl = process.env.REACT_APP_BOOKIEBUDDY_SERVICE;
        //Make call to get or create the token for the user with the token attached
        const result = await axios.post(`${userServiceUrl}func-get-create-token`, {
            email,
            password, 
        }, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        });
        //Return the results
        return Promise.resolve(result?.data);
    } catch(e) {
        //If errors occur return them
        return Promise.reject(e);
    }
}

export const createUser = async (user, token) => {
    try {
        //Get the local admin token from environment
        const userServiceUrl = process.env.REACT_APP_BOOKIEBUDDY_SERVICE;
        //Make call to create a user with the token attached
        const result = await axios.post(`${userServiceUrl}func-create-user`,
            user
        , {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        });
        //Return the result of creating the user
        return Promise.resolve(result?.data);
    } catch(e) {
        //If errors occur reject and send the error object
        return Promise.reject(e);
    }
}