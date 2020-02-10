import React  from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postShowRequest} from '../actions/posts';
import TimeAgo from '../lib/TimeAgo';
import styled from 'styled-components';
import {Icon, Popup} from 'semantic-ui-react';

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
    .feed_tags {
        position:relative;
        width:auto;
        background-color:transparent;
        border:1px solid #E1E7EB;
        border-radius:5px;
        padding: 3px 8px;
        margin:0 0 30px 5px;
        font-weight:500;
        color:#90A4AE
        transition:.2s;
        &:hover {
            border-color:#008000;
            color:#008000
        }
        &:nth-child(2) {
            margin-left:15px;
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
              
              display: -webkit-box
              font-family: Source Serif Pro,serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 1.4;
              p {
                display: -webkit-box; display: -webkit-box; display: -ms-flexbox;
                max-height:200px; 
                overflow:hidden; 
                vertical-align:top; 
                text-overflow: ellipsis; 
                word-break:break-all;
                -webkit-box-orient:vertical; 
                -webkit-line-clamp:5;
                font-weight:500;
              }
          }
        };
        .feed_reply {
            padding:0 20px 5px 0;
            text-align:right;
            
        }
    };


`

const Feed = ({block, contents}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const onclickPoster = () => {
        dispatch(postShowRequest(block.id));
    }

    const hideScroll = () => {
        document.getElementById('body').style.overflow='hidden';
    }
    

    return (
        <PosterWrap className="posterDetail" id={block.id + '번'} url={block.tumnailImg} profile_img={block.user.profile_img} onClick={onclickPoster}>
            <div className="feed_Header">
                <div className="feed_profile"></div>
                <div className="feed_Header_text"> 
                    <span className="author">{block.author}</span>
                    <Popup content='실험중' trigger={<span className="date"><TimeAgo date={block.createdAt} locale="en" /></span>}/>
                </div>
            </div>
            <div className="feed_content" onClick={hideScroll}>
                <Link to={{ pathname:`/poster/${block.id}/${block.author}`, state:{background:location, block, replys:block.comments}}}>
                    <h4>{block.tumnailTitle}</h4>
                    {block.hashTags.match(',') ? block.hashTags.split(',').map( (res,i) => <span key={i} className="feed_tags">{res}</span>) : <span className="feed_tags">{block.hashTags}</span>}
                    <img style={{width:520, marginTop:10}} src={block.tumnailImg} alt="thumnail" ></img>
                    <div className="feed_preview">{contents.length > 2 ? <p>{contents.slice(0,3)}</p> : 'contents'}</div>
                </Link>
                <hr style={{margin:10}}/>
                <div className="feed_reply"><Icon name='comment outline'/>{block.comments.length}개의 댓글</div>
            </div>
        </PosterWrap>
    )
}

export default Feed