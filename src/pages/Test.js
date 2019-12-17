import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';
import styled from 'styled-components';

const PosterWrap = styled.div`
    position:relative;
    display:inline-block;
    overflow:hidden;
    background: url(${props=> props.url});
    background-color: rgba(243, 234, 234, 0.986);
    backgroud-position:center center;
    background-size:cover;
    border-radius:20px; 
    margin:0 10px;
    width:40%;
    height: 30%;
    color:black;
    margin-top:50px
    padding:20px 0;
    box-shadow: -5px 4px 37px -6px rgba(0,0,0,0.75);
    .additional {
        position:absolute;
        padding:10px;
        width:100%;
        height:40%;
        background-color:rgba(0,0,0,.5);
        bottom:0;
        color:white;
        transition:.7s;
        &:hover {
            height:100%;
        }
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
                <PosterWrap className="posterDetail" url={tumnail} onClick={onclickPoster}>
                    <div className="additional"><h5>{title}</h5> #tags : {tags}</div>
                </PosterWrap>
            </Link>
    )
}

export default Test