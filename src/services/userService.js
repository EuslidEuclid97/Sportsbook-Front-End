import * as axios from "axios";

export const getUser = async (email, token) => {
    try{
        const userServiceUrl = process.env.REACT_APP_BOOKIEBUDDY_SERVICE;
        const result = await axios.get(`${userServiceUrl}func-get-user/?email=${email}`, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        });
        return Promise.resolve(result?.data);
    } catch (e) {
        return e.response.status === 404 ? Promise.resolve(undefined) : Promise.reject(e);
    }
}

export const getCreateToken = async (email, password, token) => {
    try {
        const userServiceUrl = process.env.REACT_APP_BOOKIEBUDDY_SERVICE;
        const result = await axios.post(`${userServiceUrl}func-get-create-token`, {
            email,
            password, 
        }, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        });
        return Promise.resolve(result?.data);
    } catch(e) {
        return Promise.reject(e);
    }
}

export const createUser = async (user, token) => {
    try {
        const userServiceUrl = process.env.REACT_APP_BOOKIEBUDDY_SERVICE;
        const result = await axios.post(`${userServiceUrl}func-create-user`,
            user
        , {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
        });
        return Promise.resolve(result?.data);
    } catch(e) {
        return Promise.reject(e);
    }
}