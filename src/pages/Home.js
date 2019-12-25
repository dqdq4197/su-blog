import React,{useEffect ,useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Feed from './Feed';
import {home_load_request, home_load_success} from '../actions/home';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/header/Header';


const Content = styled.div`
    width:100%;
    height:auto;
    background-color:#fafbfc;
    .categorieswrapper {
        position:relative;
        text-align:left;
        margin-top:15px;
        height:auto;
        .categories {
            top:50px;
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
        margin-left:130px;
        padding-bottom:40px;
    }
`


const Home = () => {
    const category = [
        "All",
        "React",
        "Nodejs",
        "Css",
        "Ui Design",
        "Html",
        "User Experience",
        "Javascript",
        "Angular",
        "Vue",
        "Jquery",
    ]
    const isLoading = useSelector(state => state.home.isLoading);
    const dispatch = useDispatch();

    const [posterId, setPosterId] = useState([]);
    const [value, setValue] = useState('All');

    useEffect(() => {
        callPosts();
        
    },[value]);
    
    const callPosts = async() => {
        setPosterId([]);
        dispatch(home_load_request());
        await axios.get('/home')
        .then((res) => {
            dispatch(home_load_success());
            console.log(res.data);
            res.data.map((post) => {
                let result; 
                value === 'All' ? result = true : result = post.skills.split(',').includes(value.toLowerCase());
                result ? setPosterId((previd)=> [...previd,post]) : setPosterId((previd) => [...previd]);
            })
        }).catch((err) => {
            console.log(err.res);
        })
    }

    const matchCategory = (key) => {
        setValue(key);
    }
    return (
        <Content>
            <Header></Header>
            <PosterContainer>
                <div className="categorieswrapper">
                    <ul className="categories">
                        <h5>Categories</h5>
                        {category.map(value => (<li onClick={() => matchCategory(value)} key={value}>{value}</li>))}
                    </ul>
                </div>
                
                <div className="feed">
                    {isLoading==='SUCCESS' ? (posterId.length === 0 ? "게시물이 존재하지 않습니다." : posterId.map((info, index)=>
                        <Feed key ={index} 
                              id={info.id} 
                              num={index} 
                              author={info.author}
                              contents={info.content.filter((data) => data.type ==='paragraph').map((content) => { return content.data.text})}
                              title={info.tumnailTitle}
                              tags={info.hashTags}
                              skills={info.skills}
                              tumnail={info.tumnailImg}
                              time={info.createdAt}
                              imgPath={info.user.profile_img}
                        />)) : "isLoading..."}
                </div>
            </PosterContainer>
        </Content>
    );
}

export default Home;