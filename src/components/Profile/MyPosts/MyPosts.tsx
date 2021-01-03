import React from 'react';
import { PostType } from '../../../types/types';
import AddPostForm from './AddPostForm/AddPostForm';
import s from './MyPosts.module.css';
import Post from './Post/Post';

export type FormPropsType = {
    newPostText: string
}
export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
const Myposts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    const onAddPost = (values: FormPropsType) => {
        props.addPost(values.newPostText);
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

const MyPostsMemo = React.memo(Myposts)

export default MyPostsMemo;