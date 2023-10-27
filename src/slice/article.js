import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isLoading: false,
    articles: [],
    articleDetail:null,
    error: null,
};
export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        getArticleStart: (state) => {
            state.isLoading = true;
        },
        getArticleSuccess: (state, action) => {
            state.articles = action.payload;
            state.isLoading = false;
        },
        getArticleFeature: (state, action) => {
            state.error = action.payload;
        },
        getArticleDetailStart: (state) => {
            state.isLoading = true;
        },
        getArticleDetailSuccess: (state, action) => {
            state.articleDetail = action.payload;
            state.isLoading = false;
        },
        getArticleDetailFeature: (state, action) => {
            state.error = action.payload;
            state.isLoading=false; 
        },
        postArticleStart: (state) => {
            state.isLoading = true;
        },
        postArticleSuccess: (state, action) => {
            state.isLoading = false;
        },
        postArticleFeature: (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        },
        deleteArticleStart: (state) => {
            state.isLoading = true;
        },
        deleteArticleSuccess: (state, action) => {
            state.isLoading = false;
        },
        deleteArticleFeature: (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        },
    },
});

export const {
    getArticleStart,
    getArticleSuccess,
    getArticleFeature,
    getArticleDetailFeature,
    getArticleDetailStart,
    getArticleDetailSuccess,
    postArticleStart,
    postArticleSuccess,
    postArticleFeature,
    deleteArticleStart,
    deleteArticleSuccess,
    deleteArticleFeature
} = articleSlice.actions;
export default articleSlice.reducer;
