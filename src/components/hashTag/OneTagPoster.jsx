import React,{useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GetFeed from './GetFeed';
import {useLocation} from 'react-router-dom';
import {Popup, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
const TagContainer = styled.div`
    width:1200px;
    height:100%;
    margin:0 auto;
    text-align:center;
    .title {
        width:800px;
        text-align:left;
        margin:50px auto 0;
        position:relative;
        h1 {
            display:inline-block;
            
            font-size:4rem;
        }
        a {
            color:black;
        }
        p {     
            font-size:1.2rem;
            color:rgba(0,0,0,.7);
            font-weight:500;
            margin-left:10px;

        }
        .goSearch {
            text-align:center;
            width:60px;
            height:60px;
            vertical-align:bottom;
            margin-left:10px;
            border-radius:60px;
            background-color:rgba(13,72,50,.5);
            display:inline-block;
            font-size:2rem;
            transition:.7s;
            color: rgba(0,0,0,.7);
            
            &:hover {
                width:40px;
                height:40px;
                font-size:3rem;
                
            }
            i{ 
                margin-top:10px;
            }
        }
    }
    hr {
        margin:0;
    }
`

const OneTagPoster = ({tag}) => {
    
    const [post,setPost] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getPost();
      },[location.pathname])
  
    const getPost = () => {
        axios.post('/tag/getPost', {tag})
        .then((res) => {
          setPost(res.data);
        })
    }
    
    return (
        <>
            <TagContainer>
                <div className="title">
                    <h1>#{tag}</h1>
                    <Link to='/hashtags'><Popup inverted content='태그 검색페이지로 이동합니다' trigger={<div className="goSearch"><Icon name="search" /></div>}/></Link>
                    
                    <p>{post.length}개의 포스트</p>
                </div>
                    <hr/>
                {post.map((value,index) =>
                    <GetFeed key={index} block={value}
                    contents={value.content.blocks.filter((data) => data.type ==='paragraph').map((content) => { return content.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')})}/>
                )}
            </TagContainer>
        </>
    )
}

export default OneTagPoster;