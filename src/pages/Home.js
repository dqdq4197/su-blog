import React,{useEffect} from 'react';
import Nav from '../components/nav/Nav';
import Contents from '../components/post/Contents';
import axios from 'axios';
import styled from 'styled-components';


const Content = styled.div`
    height:100%;
    width:100%;
    display:flex;
    .navigator {
        width:30%;
    }
`
const PosterContainer = styled.div`
    height:100%;
    .poster{ 
        width: 200px;
        height: 200px;
        border:1px solid black;
        display:inline-block;
        
    }
`


const Home = ({match}) => {
    
    useEffect(() => {
        callPosts();
    },[]);


    const callPosts = async() => {
        const posterContainer = document.getElementById('posterContainer')
        await axios.get('/home')
        .then((res) => {
            res.data.map((post) => {
                console.log('-----------------------------------------');
                console.log(post);
                var div = document.createElement('div');
                div.id=post.id;
                div.className = 'poster';
                posterContainer.appendChild(div);
                var result = '';
                var poster= document.getElementById(post.id);
                post.content.map((tag) => {
                    console.log(tag);
                    if(tag.type === 'paragraph') {
                        result += tag.data.text;
                        result += '<br/>'
                        return result;
                    }
                    
                });
                poster.innerHTML= result;
            });
        }).catch((err) => {
            console.log(err.res);
        })
        
    }
    return (
        <Content> 
            <div className="navigator" >
                <Nav />
                <h2>{match.params.nick}</h2>
            </div> 
            <PosterContainer id='posterContainer'>
            </PosterContainer>
            
        </Content>
    );
}

export default Home;