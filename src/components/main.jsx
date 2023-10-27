import { useDispatch, useSelector } from "react-redux";
import Loader from "../ui/loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteArticleFeature, deleteArticleStart, getArticleFeature, getArticleStart, getArticleSuccess } from "../slice/article";
import { ArticleService } from "../service/article";

const Main = () => {
    const { articles, isLoading } = useSelector((state) => state.article);
    const { loggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const getArticles = async () => {
        dispatch(getArticleStart())
        try {
            const response = await ArticleService.getArticle();
            dispatch(getArticleSuccess(response.articles))
        } catch (error) {
            dispatch(getArticleFeature(error))
        }

    }
    useEffect(() => {
        getArticles();
        //eslint-disable-next-line
    }, [])

    const deleteArticleHandler = async (slug) => {
        dispatch(deleteArticleStart());
        try {
            await ArticleService.deleteArticle(slug);
            getArticles();
        } catch (error) {
            dispatch(deleteArticleFeature(error))
        }
    }

    const navigate = useNavigate();
    return (
        <>
            {isLoading && <div className="d-flex justify-content-center"><Loader /></div>}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {articles.map((item) => (
                    <div className="col  " key={item.id}>
                        <div className="card shadow-sm h-100">
                            <svg
                                className="bd-placeholder-img card-img-top"
                                width="100%"
                                height="225"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Placeholder: Thumbnail"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                            >
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                            </svg>
                            <div className="card-body">
                                <p className="card-text fw-bold ">
                                    {item.title}
                                </p>
                                <p className="card-text">
                                    {item.description}
                                </p>
                            </div>
                            <div className="d-flex card-footer justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-success"
                                        onClick={() => navigate(`/article/${item.slug}`)}
                                    >
                                        View
                                    </button>
                                    {(loggedIn && user.username === item.author.username) && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => navigate(`/edit-article/${item.slug}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteArticleHandler(item.slug)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                                <small className="text-body-secondary text-capitalize">{item.author.username}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Main;
