import React,{useState, useEffect, useRef} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Header from '../components/header/Header';
import styled from 'styled-components';
import {Input} from '../lib/AuthInput';
import {useHistory} from 'react-router-dom';

const SearchBox = styled.div`
    width:100%;
    height:100vh;
    text-align:center;
    .searchInput {
        margin:50px 0;
    }
    
`
const FeedBox = styled.div`
    position:relative;
    width:50%;
    text-align:left;
    border-radius:30px;
    height:auto;
    margin:0 auto 30px auto;
    cursor:pointer;
    background-color:rgba(233,233,233,.3);
    .profile_box {
        display:flex;
    }
    .profile_pic {
        position:relative;
        width:50px;
        height:50px;
        left:0;
        top:-20px;
        margin-right:10px;
        border-radius:50px;
        background:url(${props => props.img});
        background-position:center center;
        background-size:cover;
    }
    .profile_author {
        font-size:1.3rem;
        position:relative;
        top:-15px;
    }
    .poster_title {
        font-weight:500;
        font-size:2rem;
    }
`
const Search = ({location}) => {

    
    const query = queryString.parse(location.search)
    const [keyWord, setKeyWord] = useState(query.key);
    const [posts, setPosts] = useState('');
    const inputFocus = useRef();
    const history = useHistory();

    useEffect(() => {
        inputFocus.current.focus();
        getData();
    },[])
    const getData = () => {
        axios.post('/home').then((res) => {
            setPosts(res.data);
        })
    }

    const onchangeValue = (e) => {
        setKeyWord(e.target.value);
    }
    const searchComponent = (data) => {
        data = data.filter((search) => { 
            return search.content.blocks.map((text) => {
                switch( text.type ) {
                    case 'paragraph': case 'header':
                        return text.data.text.indexOf(keyWord.toLowerCase()) >-1
                        break;
                    case 'list':
                        return text.data.items.map((item) => item.indexOf(keyWord.toLowerCase()) >-1).find(ele => ele > 0)
                        break;
                    case 'checklist':
                        return text.data.items.map((item) => item.text.indexOf(keyWord.toLowerCase()) >-1).find(ele => ele > 0)
                        break;
                    default:
                        return false;
                };
            }  ).find(element => element > 0 ) > 0
            
        })
        console.log(data);
        return data.map((search) => {
        return (
            <FeedBox onClick={()=>{history.push(`/poster/${search.id}/${null}`)}} key={search.id} img={search.user.profile_img}>
                <div className="profile_box">
                    <div className="profile_pic"></div><div className='profile_author'>{search.author}</div>
                </div>
                <div className='poster_title'>{search.tumnailTitle}</div>
            </FeedBox>)
        })
    };
    
    return (
        <>
        <Header />
        <SearchBox >
            <Input className="searchInput" ref={inputFocus} name={'# 키워드를 입력해주세요'} padding={'1.5%'} width={'45%'} size={'1.2rem'} onChange={onchangeValue} value={keyWord} />
            {posts ? searchComponent(posts) : null}
        </SearchBox>
        </>
    )
}

export default Search;