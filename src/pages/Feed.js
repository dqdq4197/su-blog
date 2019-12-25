import React, {useEffect, useState} from 'react';
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
            background:url(${props => props.profile_img});
            background-size:cover;
            background-position:center center;
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
              max-height:200px;
              overflow:hidden;
              text-overflow: ellipsis;
              white-space: normal;
              word-wrap: break-word;
              -webkit-line-clamp: 3;
              display: -webkit-box
              font-family: Source Serif Pro,serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 1.4;
          }
        };
    };


`

const Feed = ({id,author,num,title,tags, skills, tumnail,time,imgPath, contents}) => {
    const dispatch = useDispatch();
    const onclickPoster = () => {
        dispatch(postShowRequest(id));
    }
    
    return (
        <PosterWrap className="posterDetail" url={tumnail} profile_img={imgPath} onClick={onclickPoster}>
            <div className="feed_Header">
                <div className="feed_profile"></div>
                <div className="feed_Header_text"> 
                    <span className="author">{author}</span>
                    <span className="date"><TimeAgo date={time} locale="en" /></span>
                </div>
            </div>
            <div className="feed_content">
                <Link to={`/poster/${id}/${author}`}>
                    <h4>{title}</h4>
                    <img style={{width:520}} src={tumnail} alt="" ></img>
                    <div className="feed_preview">{contents.length > 2 ? contents.slice(0,3) : 'contents'}...</div>
                </Link>
            </div>
        </PosterWrap>
    )
}

export default Feed