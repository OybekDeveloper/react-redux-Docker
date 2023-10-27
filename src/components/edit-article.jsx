import { useEffect, useState } from 'react'
import ArticleForm from './article-form'
import { useDispatch } from 'react-redux';
import { getArticleDetailFeature, getArticleDetailStart, getArticleDetailSuccess, postArticleFeature, postArticleStart, postArticleSuccess } from '../slice/article';
import { ArticleService } from '../service/article';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFeature(error));
      }
    };
    getArticleDetail();
    //eslint-disable-next-line
  }, []);

  const formArticle = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    const article = { title, description, body }
    try {
      await ArticleService.putArticle(slug, article);
      dispatch(postArticleSuccess());
      navigate('/')
    } catch (error) {
      dispatch(postArticleFeature(error))
    }
  }

  const formProps = { title, setTitle, description, setDescription, body, setBody, formArticle }

  return (
    <div className='w-75 mx-auto text-center'>
      <h1>Edit Article</h1>
      <ArticleForm {...formProps} />
    </div>
  )
}

export default EditArticle