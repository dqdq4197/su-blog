import React,{useState,useEffect, useCallback} from 'react';
import {Input} from '../../lib/AuthInput';
import stlyed from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';

const InputBox = stlyed.div`
    .explanation {
        text-align:left;
        display:inherit;
        margin:50px 0 0 23%;
        font-size:.9rem;
        color:#90A4AE;
    }
    .input {
        margin:0 auto;
        display:block;
    }
`
const ListContainer = stlyed.div`
    display:flex;
    margin:50px auto;
    height:auto;
    text-align:center;
    width:1200px;
    h5 {
        text-align:left;
        color:black;
        right:0;
    }
    ul {
        width:auto;
        padding:0;
        margin:0;
        text-align:left;
        a {
            color:rgba(0,0,0,.9);
        }
        li {
            position:relative;
            width:300px;
            height:100px;
            font-size:1.4rem;
            font-weight:500;
            padding:10px 0 0 30px;
            margin:0 auto;
            background-color:transparent;
            list-style: none;
            display:inline-block;
            &:hover {
                &::before {
                    height:50px;
                    background-color:#008000;
                }
            }
            &::before {
                content: 'a';
                width: 3px;
                height: 30px;
                background-color: #90A4AE;
                border-radius:5px;
                overflow:hidden;
                position: absolute;
                color: transparent;
                left: 0;
                transition:.4s;
                
            }
            &:hover {
                color:#008000;
                .num {
                    color:black;
                }
            }
            .num {
                font-size:1rem;
                margin-left:10px;
                
                b {
                    color:rgb(100,100,100);
                }
            }
        }
    }
`
const SearchTag = ({data}) => {

    const [tagKey, setTagKey] = useState('');
    const [getTag, setGetTag] = useState([]);
    const onChangeTag = (e) => {
        setTagKey(e.target.value);
    }

    useEffect(() => {
        getTags();
    },[])
    
    const getTags = () => {
        axios.get('/tag/getTags').
        then((res) => {
            res.data.map(tag =>tag.hashTags ===null ? null: tag.hashTags.split(',').map( res => setGetTag((prev) => [...prev,res])));
            
            // const priTags =searchTag.filter((value, index) => {return prikey.map((v)=>v.toUpperCase()).indexOf(value.toUpperCase()) === index}
        })
    }
    
    const MatchTag = useCallback(() => {
            const searchTag = getTag.filter((tag) => tag.toLowerCase().indexOf(tagKey.toLowerCase()) > -1)
            const countedTag = searchTag.map(case1 => case1.toLowerCase()).reduce((allNames, name)  => { 
                if (name in allNames) {
                  allNames[name]++;
                }
                else {
                  allNames[name] = 1;
                }
                return allNames;
            }, {});
            
            return Object.keys(countedTag).map(key => 
                <Link to={`/hashtags/${key}`} key={key}><li># {key}<p className="num"><b>{countedTag[key]}</b>개의 포스트</p></li></Link>
            )
                
                
    },[tagKey, getTag])
    // return <>{tagKey==='' ?  <h5>모든 태그</h5> : <h5><b>{searchTag.length}</b>개의 태그</h5>}<ul>{searchTag.map((tag)=> { return <li key={tag}>{tag}</li>})}</ul></>
    return (
        <>  
            <InputBox >
                <p className="explanation">Tag를 검색해보세요! 원하는 정보를 더 쉽고 빠르게 찾을 수 있습니다.</p>
                <Input name="# Tag를 입력하세요" className="input" onChange={onChangeTag} value={tagKey}></Input>
            </InputBox>
            <ListContainer >
                <ul><MatchTag /></ul>
            </ListContainer>
        </>
    )
}

export default SearchTag;