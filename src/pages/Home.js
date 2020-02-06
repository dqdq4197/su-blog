import React,{useEffect ,useState, useRef} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Feed from './Feed';
import SearchComponent from '../components/home/SearchComponent';
import {home_load_request, home_load_success, home_more_request} from '../actions/home';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/header/Header';
import {useHistory} from 'react-router-dom';


const Content = styled.div`
    width:100%;
    height:auto;
    background-color:#fafbfc;
    .categorieswrapper {
        position:relative;
        text-align:left;
        margin-top:50px;
        height:auto;
        .categories {
            top:70px;
            position:sticky;
            position:-webkit-sticky;
            width:120px;
            list-style: none;
            margin:0;
            padding:0;
            h5{
                font-weight:600;
                margin-bottom:20px;
            }
            li {
                margin-top:10px;
                cursor:pointer;
                &::before {
                    content:'a';
                    font-size:.7rem;
                    margin-right:5px;
                    color:transparent;
                    width:3px;
                    height:100%;
                    background-color:green;
                }
                &:hover {
                    font-weight:600;
                }
                &:active {
                    color:red;
                }
            }
        }
    }
`



const Home = () => {
    const category = [
        "All",
        "React",
        "Nodejs",
        "Css",
        "Graphic Design",
        "Html",
        "User Experience",
        "Javascript",
        "Angular",
        "Vue",
        "Jquery",
    ]
    const home = useSelector(state => state.home);
    const dispatch = useDispatch();
    const prevRef = useRef(0);
    const nextRef = useRef(4);
    const loading = useRef('stop');
    const cateValue = useRef('All');
    const history = useHistory();
    const [posterId, setPosterId] = useState([]);

    const PosterContainer = styled.div`
        position:relative;
        display:flex;
        margin:15px auto 0;
        width:1010px;
        height:auto;
        text-align:center;
        .feed {
            width:520px;
            height:100%;
            margin-top:15px;
            margin-left:130px;
            padding-bottom:40px;
        }
        #${cateValue.current.replace(/ /gi, "")} {
            font-size:1.06rem;
            font-weight:700;
            color:rgb(13, 72, 50);
        }
`

    useEffect(() => {
        window.scrollTop=0;
        callPosts();
        window.addEventListener('scroll', handleScroll,true);
        return (() => { window.removeEventListener('scroll', handleScroll)})
    },[cateValue.current]);
    const callPosts = async() => {
        setPosterId([]);
        dispatch(home_load_request());
        
        await axios.post('/home', {value: cateValue.current})
        .then((res) => {
            let test;
            dispatch(home_load_success());
            console.log(res.data);
            test = res.data.slice(0,4);
            test.map((post) => {
                setPosterId((previd)=> [...previd,post])
            loading.current = 'continue'
            })
        }).catch((err) => {
            console.log(err.res);
        })
    };
    
    const handleScroll = () => {
        
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        
        if((scrollTop + clientHeight >= scrollHeight) && scrollTop !==0 && loading.current==='continue') {
            prevRef.current = prevRef.current+4;
            nextRef.current = nextRef.current+4;
            loading.current = 'stop'
            axios.post('/home', {value :cateValue.current})
                .then((res) => {
                    let test;
                    dispatch(home_load_success());
                    test = res.data.slice(prevRef.current, nextRef.current) 
                    test.map((post) => {
                        setPosterId((previd)=> [...previd,post])
                    })
                    loading.current = 'continue';
                }).catch((err) => {
                    console.log(err.res);
                })
        }
    }
    const matchCategory = (key) => {
        if(key !== cateValue.current) {
            setPosterId([]);
            cateValue.current=key;
            prevRef.current = 0;
            nextRef.current = 4;
        }
    }
    
    
    
    return (
        <Content>
            <Header></Header>
            
            <PosterContainer>
                <div className="categorieswrapper">
                    <ul className="categories">
                        <SearchComponent />
                        <h5>Categories</h5>
                        {category.map(value => (<li id={value.replace(/ /gi, "") } onClick={() => matchCategory(value)} key={value}>{value}</li>))}
                    </ul>
                </div>
                <div className="feed">
                    {home.isLoading==='SUCCESS' ? (posterId.length === 0 ? "게시물이 존재하지 않습니다." : posterId.map((info, index)=>
                        <Feed key ={index} 
                              id={info.id} 
                              num={index} 
                              author={info.author}
                              contents={info.content.blocks.filter((data) => data.type ==='paragraph').map((content) => { return content.data.text})}
                              title={info.tumnailTitle}
                              tags={info.hashTags}
                              skills={info.skills}
                              tumnail={info.tumnailImg}
                              time={info.createdAt}
                              imgPath={info.user.profile_img}
                              replys={info.comments.length}
                        />)) : "isLoading..."}
                </div>
            </PosterContainer>
        </Content>
    );
}

export default Home;