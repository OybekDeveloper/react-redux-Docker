import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postArticleFeature, postArticleStart, postArticleSuccess } from '../slice/article';
import ProfileForm from './profile-form';
import { authProfileFeature, authProfileStart, authProfileSuccess, signUserSuccess } from '../slice/auth';
import AuthService from '../service/auth';
import { getItem } from '../helpers/persistence-storage';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');


    const dispatch = useDispatch();
    useEffect(() => {
        const getProfile = async () => {
            dispatch(authProfileStart());
            try {
                const response = await AuthService.getUser(id)
                console.log(response.user)
                authProfileSuccess(response.user)
                setUsername(response.user.username);
                setBio(response.user.bio);
                setImage(response.user.image);
            } catch (error) {
                dispatch(authProfileFeature(error));
            }
        }
        getProfile()
        //eslint-disable-next-line
    }, [])

    const formSubmit = async (e) => {
        e.preventDefault();
        dispatch(postArticleStart());
        const token= getItem('token')
        console.log(token)
        const profileData = { username, bio, image,token };
        try {
            await AuthService.putUser(profileData)
            const response = await AuthService.getUser()
			dispatch(signUserSuccess(response.user))
            navigate('/');
            console.log(profileData)
        } catch (error) {
            dispatch(postArticleFeature(error))
        }
    }
    const formProps = { username, setUsername, bio, setBio, image, setImage, formSubmit }
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div className=' w-75 text-center'>
                    <h1>You Profile </h1>
                <ProfileForm {...formProps} />
            </div>
            <div>
                <img src={image} alt='img' />
            </div>
        </div>
    )
}

export default Profile