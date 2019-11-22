import React,{useEffect ,useState} from 'react';
import Nav from '../components/nav/Nav';
import Contents from '../components/post/Contents';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Test from './Test';
import '../components/Home/home.css';


const Content = styled.div`
    height:100%;
    width:100%;
    display:flex;
    .asd {
        margin-left:100px;
        width:100%;
        height:100%;
    }
`
const PosterContainer = styled.div`
    .dis{
        width:30%;
        height:30%;
        display:inline-block;
        border:1px solid black;
    }
    width:80%;
    height:100%;
    .poster{ 
        border:1px solid black;
        width:100%;
        height:300px;
        display:inline-block;
    }
`


const Home = ({match}) => {
    

    const [posterId, setPosterId] = useState([]);
    const [id, setId] = useState([]);
    useEffect(() => {
        callPosts();
    },[]);
    const GetPostId = (
        <div>
            <Link to={`home:${posterId}`}>`${posterId}번 포스터` </Link>
        </div>
    )

    const callPosts = async() => {
       // const posterContainer = document.getElementById('posterContainer')
        await axios.get('/home')
        .then((res) => {
            res.data.map((post) => {
                setPosterId((previd)=> [...previd,post])
        })
        }).catch((err) => {
            console.log(err.res);
        })
        
    }
    
    

    return (
        
        <Content> 
            <Nav />
            <div className="asd">
            <PosterContainer id='posterContainer'>
                {posterId.map(info=><Test id={info.id}></Test>)}
                {console.log("posterId : ", posterId.map(info=>info.id))}
            </PosterContainer>
            </div>
        </Content>
    );
}

export default Home;