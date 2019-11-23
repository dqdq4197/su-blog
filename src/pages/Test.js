import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';

const Test = ({id}) => {
    const dispatch = useDispatch();
    const onclickPoster = () => {
        dispatch(postShowRequest(id));
    }
    return (
        <Link to={`/poster/${id}`}>
            <div onClick={onclickPoster}>{id}번째 포스터</div>
        </Link>
    )
}

export default Test