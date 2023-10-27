import React from 'react';
import { Login, Register, Main, Navbar, ArticleDetail, EditArticle, Profile } from './components'
import { Route, Routes } from "react-router-dom";
import './index.css'
import AuthService from './service/auth';
import { useEffect } from 'react';
import { getItem } from './helpers/persistence-storage';
import { useDispatch } from 'react-redux';
import { signUserSuccess } from './slice/auth';
import CreateArticle from './components/create-article';
import { toast } from 'react-toastify';
const App = () => {
    const dispatch = useDispatch()

	const getUser = async () => {
		try {
			const response = await AuthService.getUser()
			dispatch(signUserSuccess(response.user))
		} catch (error) {
			console.log(error)
		}
	}
    useEffect(()=>{
        const token = getItem('token');
        if(token){
            getUser();   
        }
        if (!token) {
            toast.warn("Siz ro'yxatdan o'tmagansiz!!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        //eslint-disable-next-line
    },[])

    return (
        <div className={'container'}>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Main />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/article/:slug'} element={<ArticleDetail />} />
                <Route path={'/create-article'} element={<CreateArticle />} />
                <Route path={'/edit-article/:slug'} element={<EditArticle />} />
                <Route path={'/profile/:id'} element={<Profile />} />
            </Routes>
        </div>
    );
};

export default App;