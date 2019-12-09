import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';

const Test = ({id,author,num,title,tags, skills, tumnail}) => {
    const dispatch = useDispatch();
    const onclickPoster = () => {
        dispatch(postShowRequest(id));
        console.log(author)
    }

    return (
        <Link to={`/poster/${id}/${author}`}>
            {}
    <div onClick={onclickPoster}>
        <img src={tumnail} />
        {author}님의 포스터 제목 :{title} skills: {skills} tags:{tags} </div>
        </Link>
    )
}

export default Test