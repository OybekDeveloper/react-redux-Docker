import React, { useState } from 'react'
import ArticleForm from './article-form'
import { ArticleService } from '../service/article';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postArticleFeature, postArticleStart, postArticleSuccess } from '../slice/article';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formArticle = async (e) => {
        e.preventDefault();
        dispatch(postArticleStart());
        const article = { title, description, body }
        try {
            const response = await ArticleService.postArticle(article);
            console.log(response);
            dispatch(postArticleSuccess());
            navigate('/')
        } catch (error) {
            dispatch(postArticleFeature(error))
        }
    }

    const formProps = { title, setTitle, description, setDescription, body, setBody, formArticle }
    return (
        <div className='w-75 mx-auto text-center'>
            <h1>Create Article</h1>
            <ArticleForm {...formProps} />
        </div>
    )
}

export default CreateArticle;