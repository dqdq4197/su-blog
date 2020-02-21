import React,{useEffect ,useState, useRef} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Feed from '../components/home/Feed';
import SearchComponent from '../components/home/SearchComponent';
import {home_load_request, home_load_success, home_more_request, home_more_success} from '../actions/home';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/header/Header';
import HomeFeed from '../components/loadingComponent/HomeFeed';
import HomeFeedMore from '../components/loadingComponent/HomeFeedMore';
import ScrollTopBtn from '../components/home/ScrollTopBtn';
import HashTags from '../components/home/HashTags';

const Content = styled.div`
    width:100%;
    height:auto;
    background-color:#fafbfc;
    .categorieswrapper {
        position:relative;
        width:25%;
        text-align:left;
        margin-top:50px;
        height:auto;
        .categories {
            top:70px;
            position:sticky;
            position:-webkit-sticky;
            width:100%;
            list-style: none;
            margin: 0;
            padding:0;
            h5{
                font-weight:600;
                margin-bottom:20px;
            }
            li {
                margin-top:10px;
                cursor:pointer;
                font-size:1.10rem;
                &::before {
                    content:'a';
                    font-size:0.8rem;
                    margin-right:5px;
                    color:transparent;
                    width:3px;
                    height:100%;
                    background-color:green;
                }
                &:hover {
                    font-weight:600;
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
    const [hashTag, setHashTag] = useState([]);
    const [posterId, setPosterId] = useState([]);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    const PosterContainer = styled.div`
        position:relative;
        display:flex;
        margin:15px auto;
        width:80%;
        height:auto;
        text-align:center;
        .feed {
            width:100%;
            height:100%;
            margin:15px 5% 0;
            padding-bottom:40px;
        }
        #${cateValue.current.replace(/ /gi, "")} {
            font-size:1.15rem;
            font-weight:700;
            color:rgb(13, 72, 50);
        }
        .rightUtil {
            position:sticky;
            top:70px;
            width:20%;
            height:600px;
            margin-top:50px;
            
        }
`
    useEffect(() => {
        callPosts();
        window.scrollTo(0,0);
        window.addEventListener('scroll', handleScroll);
        
        return (() => { window.removeEventListener('scroll', handleScroll)})
    },[cateValue.current]);
    
    const callPosts = async() => {
        setPosterId([]);
        dispatch(home_load_request());
        await axios.post('/home', {value: cateValue.current})
        .then((res) => {
            res.data.map(tag =>tag.hashTags=== null ? null : tag.hashTags.split(',').map( res => setHashTag(prev => [...prev, res])));
            let test;
            dispatch(home_load_success());
            test = res.data.slice(0,4);
            test.map((post) => {
                setPosterId((previd)=> [...previd,post])
            })
            if(res.data.length<=4) {
                loading.current='stop';
            }else {
                loading.current='continue';
            }
            loading.current = 'continue';
        }).catch((err) => {
            console.log(err.res);
        })
    };
    const handleScroll = async() => {
        
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if(scrollTop > 300) {
            setShowScrollBtn(true);
        } else {
            setShowScrollBtn(false);
        }
        if((scrollTop + clientHeight >= scrollHeight-1) && scrollTop !==0 && loading.current==='continue' ) {
            if(window.location.pathname.indexOf('poster')>-1) return false ; 
            dispatch(home_more_request());
            loading.current = 'stop';
            console.log('feed 추가');
            
            prevRef.current = prevRef.current+4;
            nextRef.current = nextRef.current+4;
            await axios.post('/home', {value :cateValue.current})
                .then((res) => {
                    let test;
                    dispatch(home_more_success());
                    console.log(res.data.length,prevRef)
                    if(res.data.length-2<=prevRef.current){
                        loading.current = 'stop';
                    } else {
                        loading.current = 'continue';
                    }
                    test = res.data.slice(prevRef.current, nextRef.current) 
                    
                    test.map((post) => {
                        setPosterId((previd)=> [...previd,post])
                    })
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
                {showScrollBtn ? <ScrollTopBtn /> : null }
                <div className="categorieswrapper">
                    <ul className="categories">
                        <SearchComponent />
                        <h5>Categories</h5>
                        {category.map(value => (<li id={value.replace(/ /gi, "") } onClick={() => matchCategory(value)} key={value}>{value}</li>))}
                    </ul>
                </div>
                <div className="feed">
                    {home.isLoading==='SUCCESS' ?
                     (posterId.length === 0 ? "게시물이 존재하지 않습니다." : posterId.map((info, index) =>
                        <Feed key ={index} 
                              block={info}
                              contents={info.content.blocks.filter((data) => data.type ==='paragraph').map((content) => { return content.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')})}
                        />)) 
                    : <HomeFeed />}
                    {home.moreIsLoading==='WAITING' ? <HomeFeedMore /> : null }
                </div>
                <div className="rightUtil">
                    <div className="hashTagBox">
                        <HashTags data={hashTag} loading={home.isLoading}/>
                    </div>
                    <div className="findUser">
                    </div>
                </div>
            </PosterContainer>
        </Content>
    );
}

export default Home;