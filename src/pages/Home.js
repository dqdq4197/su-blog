import React,{useEffect ,useState, useRef} from 'react';
import styled from 'styled-components';
import Feed from '../components/home/Feed';
import SearchComponent from '../components/home/SearchComponent';
import {home_load_request, home_load_success, home_more_request, home_more_success} from '../actions/home';
import {device} from '../lib/MediaStyled';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Header from '../components/header/Header';
import ScrollTopBtn from '../components/home/ScrollTopBtn';
import HashTags from '../components/home/HashTags';
import Category from '../components/home/Category';
import {homeAPI} from '../lib/api/home';
import DeskTop from '../lib/skeleton/Home/DeskTop';
import LaptopL from '../lib/skeleton/Home/LaptopL';

const Content = styled.div`

    width:100%;
    height:auto;
    background-color:#fafbfc;
    .laptopL {
        display:none;
        @media ${device.laptopL} {
            display:block;
        }
    }
    .desktop {
        @media ${device.laptopL} {
            display:none;
        }
    }
    .topBar {
        display:none;
        width:100%;
        padding:0 5%;
        margin:0 auto;
        align-items:center;
        justify-content: space-between;
        @media ${device.tablet} {
            display:flex;
        }
        @media ${device.mobileL} {
            padding:0;
        }
        .mTags {
            width:50px;
        }
        .mCategories {
            background-color:rgba(13,72,50,.8);
            border-radius:5px;
            margin-top:5px;
            padding:8px;
            @media ${device.mobileL} {
                padding:3px;
            }
        }
    }
    .categorieswrapper {
        position:relative;
        @media ${device.tablet} {
            display:none;
          }
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
                    font-size:0.6rem;
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



const Home = ({match}) => {
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
    const [hashTag, setHashTag] = useState([]);
    const [posterId, setPosterId] = useState([]);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const history = useHistory();

    const PosterContainer = styled.div`
        display:flex;
        margin:15px auto;
        width:1250px;
        
        height:auto;
        @media ${device.laptopL} {
            width:1024px;
        }
        @media ${device.laptop} {
            width:94%;
        }
        @media ${device.tablet} {
            width:100%;
            margin:0 auto;
        }
        .feed {
            width:100%;
            height:100%;
            margin:15px 5% 0;
            padding-bottom:40px;
            @media ${device.tablet} {
                margin-top:5px;
            }
            @media ${device.mobileL} {
                margin:5px 0;
            }
            
        }
        #${match.params.categories && match.params.categories.replace(/ /gi, "") || 'All'} {
            font-size:1.15rem;
            font-weight:700;
            color:rgb(13, 72, 50);
        }
        .rightUtil {
            position:sticky;
            @media ${device.laptop} {
                display:none;
              }
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
    },[match.params.categories]);
    
    const callPosts = async() => {
        setPosterId([]);
        dispatch(home_load_request());
        // await axios.get(`/home/${match.params.categories}`)
        homeAPI.get({page:match.params.categories,history:history})
        .then((res) => {
            res.data.map(tag =>tag.hashTags=== null ? null : tag.hashTags.split(',').map( res => setHashTag(prev => [...prev, res])));
            console.log(res.data);
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
            homeAPI.get({page:match.params.categories,history:history})
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
        history.push(`/home/${key}`);
        prevRef.current = 0;
        nextRef.current = 4;
    }
    
    return (
        <Content>
            <Header></Header>
            <div className="topBar">
                <div className="mTags"></div>
                <div className="mCategories"><Category /></div>
            </div>
            
            <PosterContainer>
                {/* {showScrollBtn ? <ScrollTopBtn /> : null } */}
                <div className="categorieswrapper">
                    <ul className="categories">
                        <SearchComponent />
                        {/* <h5>Categories</h5> */}
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
                    : <>
                        <div className="desktop"><DeskTop /></div>
                        <div className="laptopL"><LaptopL /></div>
                      </>}

                    {home.moreIsLoading==='WAITING' ? <>
                        <div className="desktop"><DeskTop /></div>
                        <div className="laptopL"><LaptopL /></div>
                      </> : null }
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