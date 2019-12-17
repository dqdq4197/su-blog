import React,{useEffect ,useState} from 'react';
import Nav from '../components/nav/Nav';
import axios from 'axios';
import styled from 'styled-components';
import Test from './Test';
import {home_load_request, home_load_success} from '../actions/home';
import {useDispatch, useSelector} from 'react-redux';
import Header from './Header';


const Content = styled.div`
    height:100%;
    width:100%;
    display:flex;
    .main {
        width:100%;
        height:100%;
        
    }
`
const PosterContainer = styled.div`
    
    margin:100px 0 0 300px;
    width:80%;
    height:100%;
    .poster{ 
        border:1px solid black;
        width:100%;
        height:300px;
        display:inline-block;
    }
`


const Home = () => {
    const isLoading = useSelector(state => state.home.isLoading);
    const dispatch = useDispatch();
    const [posterId, setPosterId] = useState([]);

    useEffect(() => {
        callPosts();
    },[]);

    const callPosts = async() => {
        dispatch(home_load_request());
        await axios.get('/home')
        .then((res) => {
            dispatch(home_load_success());
            res.data.map((post) => {
                return setPosterId((previd)=> [...previd,post])
        })
        }).catch((err) => {
            console.log(err.res);
        })
    }
    return (
        <Content> 
            <Nav />
            <div className="main">
                <div> </div>
                <Header></Header>
                <PosterContainer id='posterContainer'>
                    {isLoading==='SUCCESS' ? posterId.map((info, index)=>
                            <Test key ={info.id} 
                                  id={info.id} 
                                  num={index} 
                                  author={info.author}
                                  title={info.tumnailTitle}
                                  tags={info.hashTags}
                                  skills={info.skills}
                                  tumnail={info.tumnailImg}
                            />) : "isLoading..."}
                </PosterContainer>
            </div>
        </Content>
    );
}

export default Home;