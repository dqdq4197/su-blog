import React,{useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GetFeed from './GetFeed';

const TagContainer = styled.div`
    width:1200px;
    height:100%;
    margin:0 auto;
    text-align:center;
    .title {
        text-align:left;
        margin:50px 0 0 200px;
        hr {
            margin:0;
            width:80%;
        }
        p {
            margin-left:60px;
            font-size:1.2rem;
        }
    }
`

const OneTagPoster = ({tag}) => {
    
    const [post,setPost] = useState([]);
    useEffect(() => {
        getPost();
      },[])
  
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
                    <p>{post.length}개의 포스트</p>
                    <hr/>
                </div>
                {post.map((value,index) =>
                    <GetFeed key={index} block={value}
                    contents={value.content.blocks.filter((data) => data.type ==='paragraph').map((content) => { return content.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')})}/>
                )}
            </TagContainer>
        </>
    )
}

export default OneTagPoster;