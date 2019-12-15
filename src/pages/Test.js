import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';
import styled from 'styled-components';

const PosterWrap = styled.div`
    width:70%;
    height:200px;
    background-color: rgba(243, 234, 234, 0.986);
    color:black;
    margin-top:50px
    padding:20px 0;
    box-shadow: -5px 4px 37px -6px rgba(0,0,0,0.75);
    img {
        width: 200px;
        height: auto;
    }

`

const Test = ({id,author,num,title,tags, skills, tumnail}) => {
    const dispatch = useDispatch();
    const onclickPoster = () => {
        dispatch(postShowRequest(id));
        console.log(author)
    }

    return (
        <Link to={`/poster/${id}/${author}`}>
            {}
            <PosterWrap onClick={onclickPoster}>
                <img src={tumnail} />
                <h3>{title}</h3> #tags : {tags}
            </PosterWrap>
        </Link>
    )
}

export default Test