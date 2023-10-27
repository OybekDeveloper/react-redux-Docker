import React from 'react'
import Input from '../ui/input'
import TextArea from '../ui/text-area'
import { useSelector } from 'react-redux'

const ArticleForm = (props) => {
    const { isLoading } = useSelector(state => state.article);
    const { setBody, setDescription, setTitle, title, description, body, formArticle} = props;
    return (
        <form onSubmit={formArticle}>
            <Input label={'Title'} setState={setTitle} state={title} />
            <TextArea label={'Description'} setState={setDescription} state={description} />
            <TextArea label={"Bio"} setState={setBody} state={body} height={'250px'} />
            <button
                className="btn btn-primary w-100 py-2 mt-3"
                type="submit"
            >
                {isLoading ? "Loading..." : "Create "}
            </button>
        </form>
    )
}

export default ArticleForm