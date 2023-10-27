import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getArticleDetailFeature,
    getArticleDetailStart,
    getArticleDetailSuccess,
} from "../slice/article";
import { ArticleService } from "../service/article";
import moment from "moment";
import Loader from "../ui/loader";
const ArticleDetail = () => {
    const dispatch = useDispatch();
    const { articleDetail, isLoading } = useSelector((state) => state.article);
    const { slug } = useParams();

    useEffect(() => {

        dispatch(getArticleDetailStart());
        try {
            const getArticleDetail = async () => {
                const response = await ArticleService.getArticleDetail(slug);
                console.log(response.article);
                dispatch(getArticleDetailSuccess(response.article));
            };

            getArticleDetail();
        } catch (error) {
            dispatch(getArticleDetailFeature(error));
        }
        //eslint-disable-next-line
    }, [slug]);
    return (
        <>
            {isLoading ?
                (<div className="d-flex justify-content-center"><Loader /></div>
                ) : (
                    articleDetail !== null && (
                        <div className=" row p-4 p-md-6 mb-4 rounded text-body-emphasis bg-body-secondary">
                            <div classNameName="col-6 px-0">
                                <h1 className="display-4 fst-italic">{articleDetail.title}</h1>
                                <p className="lead my-3">{articleDetail.description}</p>
                                <div className="d-flex gap-3">
                                    <p>
                                        <span classNameName="fw-bold">Create At:</span>{" "}
                                        {moment(articleDetail.createdAt).format("DD MMM , YYYY")}
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className=" bg-success row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div className="col p-4 d-flex flex-column position-static">
                                        <h3 className="mb-0 text-capitalize">{articleDetail.author.username}</h3>
                                        <p className="card-text mb-auto">
                                            {articleDetail.author.bio}
                                        </p>
                                    </div>
                                    <div className="col-auto d-none d-lg-block">
                                        <svg
                                            className="bd-placeholder-img"
                                            width="200"
                                            height="250"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            aria-label="Placeholder: Thumbnail"
                                            preserveAspectRatio="xMidYMid slice"
                                            focusable="false"
                                        >
                                            <title>Placeholder</title>
                                            <rect width="100%" height="100%" fill="#55595c"></rect>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p>{articleDetail.body}</p>
                        </div>
                    )
                )}
        </>
    );
};

export default ArticleDetail;
