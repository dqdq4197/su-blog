import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';
import TimeAgo from '../lib/TimeAgo';
import styled from 'styled-components';

const PosterWrap = styled.div`
    position:relative;
    display:inline-block;
    text-align:left;
    background-color:white;
    width:520px;
    height:auto ;
    border-radius:4px;
    border:1px solid #e9e7e7;
    &:not(:first-child) {
        margin-top:12px;
    };
    .feed_Header {
        display:flex;
        width:100%;
        height:82px;
        padding:16px;
        .feed_profile{
            width:40px;
            height:40px;
            border-radius:50%;
            background-color:rgba(0,0,0,.5);
        };
        .feed_Header_text {
            width:100%;
            margin-left:10px;
        }
        .author {
            font-weight:500;
        }
        .date {
            color:rgba(0,0,0,.6);
        }
    }
    .feed_content {
        a { 
          text-decoration:none;
          color: black;
          h4 {
            font-weight:600;
            line-height:30px;
            font-size:20px;
            color:#99aab5;
            margin:0 16px 8px;
          };
          .feed_preview {
              padding:4px 16px;
              overflow-wrap:break-word;
              font-family: Source Serif Pro,serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 1.4;
          }
        };
    };


`

const Test = ({id,author,num,title,tags, skills, tumnail,date}) => {
    const dispatch = useDispatch();
    const onclickPoster = () => {
        dispatch(postShowRequest(id));
        console.log(author)
    }

    return (
        <PosterWrap className="posterDetail" url={tumnail} onClick={onclickPoster}>
            <div className="feed_Header">
                <div className="feed_profile"></div>
                <div className="feed_Header_text"> 
                    <span className="author">{author}</span>
                    <span className="date"><TimeAgo date={date} locale="en" /></span>
                </div>
            </div>
            <div className="feed_content">
                <Link to={`/poster/${id}/${author}`}>
                    <h4>{title}</h4>
                    <img style={{width:520}} src={tumnail}></img>
                    <div className="feed_preview">tate Street is one of the world's largest banks.  It has over $30 trillion in assets under custody and almost $3 trillion in assets under m…</div>
                </Link>
            </div>
        </PosterWrap>
    )
}

export default Test