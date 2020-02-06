import React,{useState, useEffect, useRef} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Header from '../components/header/Header';
import styled from 'styled-components';
import {Input} from '../lib/AuthInput';
import {Icon} from 'semantic-ui-react';

const SearchBox = styled.div`
    width:100%;
    text-align:center;
    .searchInput {
        width:30%;
        height:40px;
        margin-top:70px;
    }
`
const Search = ({location}) => {

    
    const query = queryString.parse(location.search)
    const [keyWord, setKeyWord] = useState(query.key);
    const [posts, setPosts] = useState('');
    const inputFocus = useRef();

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
        console.log(data)
        data = data.filter((search) => { 
            return (search.tumnailTitle.toLowerCase().indexOf(keyWord.toLowerCase()) >-1)
        })
        console.log(data);
        return data.map((search) => {
            return (<div key={search.id}>{search.tumnailTitle}</div>)
        })
    };
    
    return (
        <>
        <Header />
        <SearchBox >
            <Input ref={inputFocus} name={'# 키워드를 입력해주세요'} padding={'1.5%'} width={'45%'} size={'1.2rem'} onChange={onchangeValue} value={keyWord} />
            {posts ? searchComponent(posts) : null}
        </SearchBox>
        </>
    )
}

export default Search;