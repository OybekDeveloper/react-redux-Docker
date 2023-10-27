import axios from './api'

const AuthService = {
    async userRegister(user) {
        const {data}= await axios.post('/users', { user });
        return data;
    },
    async userLogin(user) {
        const {data}= await axios.post('/users/login', { user });
        return data;
    },
    async getUser(){
        const {data} = await axios.get('/user');    
        return data;
    },
    async putUser( user ){
        const {data}= await axios.put(`/user`,{ user });
        return data;
    }
}

export default AuthService;