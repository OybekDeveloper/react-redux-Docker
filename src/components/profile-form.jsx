import React from 'react'
import { useSelector } from 'react-redux';
import Input from '../ui/input';
import TextArea from '../ui/text-area';

const ProfileForm = (props) => {
    const { isLoading } = useSelector(state => state.article);
    const {username, setUsername, bio, setBio,image, setImage, formSubmit} = props;
    return (
        <form onSubmit={formSubmit}>
            <Input label={"Username"} setState={setUsername} state={username} />
            <TextArea label={'Img Url'} setState={setImage} state={image} />
            <TextArea label={"Bio"} setState={setBio} state={bio} height={'250px'} />
           
            <button
                className="btn btn-primary w-100 py-2 mt-3"
                type="submit"
            >
                {isLoading ? "Loading..." : "Edit Profile "}
            </button>
        </form>
    )
}

export default ProfileForm