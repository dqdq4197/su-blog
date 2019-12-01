import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';

const Test = ({id,author}) => {
    const dispatch = useDispatch();
    const onclickPoster = () => {
        dispatch(postShowRequest(id));
    }
    return (
        <Link to={`/poster/${id}/${author || 'Operator'}`}>
            <div onClick={onclickPoster}>{id}번째 {author}님의 포스터</div>
        </Link>
    )
}

export default Test