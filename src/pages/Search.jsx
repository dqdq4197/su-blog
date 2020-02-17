import React,{useState, useEffect, useRef, useCallback} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Header from '../components/header/Header';
import styled from 'styled-components';
import {Input} from '../lib/AuthInput';
import {useHistory} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';


const SearchBox = styled.div`
    width:100%;
    height:100vh;
    text-align:center;
    .searchInput {
        margin:0 0 5px 0;
    }
    .numposter {
        font-size:1.2rem;
        width:45%;
        margin:0 auto;
        text-align:right;
        color:#90A4AE;
        b {
            color:rgb(100, 100, 100);
        }
    }
    .explanation {
        display:inherit;
        margin:50px 0 0 0;
        font-size:.9rem;
        color:#90A4AE;
    }
    
`
const FeedBox = styled.div`
    position:relative;
    margin:0 auto 1px;
    text-align:left;
    width:50%;
    padding:10px;
    color:black;
    .profile_box {
        display:flex;
        .profile_pic {
            width:30px;
            height:30px;
            margin-right:5px;
            background:url(${props =>'img/'+ props.img});
            background-size:cover;
            background-position:center center;
            border-radius:30px;
        }
    }
    .poster_title {
        font-size:1.8rem;
        font-weight:600;
        margin-left:1%;
        cursor:pointer;
    }
    .poster_preview {
        display:flex;
        .poster_tumnail {
            width:230px;
            margin-right:2%;
            img {
                width:100%;
            }
        }
        .poster_content {
            flex:3;
            p {
                display: -webkit-box; display: -webkit-box; display: -ms-flexbox;
                max-height:100px; 
                overflow:hidden; 
                vertical-align:top; 
                text-overflow: ellipsis;
                font-size:1.1rem;
                line-height:150%;
                word-break:break-all;
                 -webkit-box-orient:vertical; 
                 -webkit-line-clamp:4;
                font-weight:500;
                color:rgb(83, 79, 79);
            }
        }
        }
    }
    
`
const Search = ({location}) => {

    
    const query = queryString.parse(location.search)
    const [keyWord, setKeyWord] = useState(query.key);
    const [posts, setPosts] = useState('');
    const inputFocus = useRef();
    const numPoster = useRef();
    const history = useHistory();

    useEffect(() => {
        inputFocus.current.focus();
        getData();
    },[])
    const getData = () => {
        console.log('asd');
        axios.post('/home').then((res) => {
            setPosts(res.data);
        })
    }

    const onchangeValue = (e) => {
        setKeyWord(e.target.value);
    }

    const searchComponent = useCallback((data) => {
        if(keyWord === '') {data = []; numPoster.current=0;}
        else {
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
        })} 
        numPoster.current = data.length
        return data.map((search) => {
        return (
            <FeedBox  key={search.id} url={search.tumnailImg} img={search.user.profile_img}>
            <hr/>
                
                <div className="profile_box">
                    <div className="profile_pic"></div><div className='profile_author'>{search.author}</div>
                </div>
                <div className='poster_title' onClick={()=>{history.push(`/poster/${search.id}/${null}`)}}>{search.tumnailTitle}</div>
                <div className='poster_preview'>
                    {search.tumnailImg ? <div className="poster_tumnail"><img src={'img/' + search.tumnailImg} /></div> : null}
                    <div className='poster_content'>
                    <p>{ search.content.blocks.map((block) => {
                            switch (block.type) {
                                case 'header': case 'paragraph':
                                    return block.data.text.replace(/&nbsp;|<b>|<br>|<i>|<\/i>|<\/b>/g,'').replace(/&gt;/g,'<').replace(/&lt;/g,'>') ;
                                case 'list' :
                                    return block.data.items.map(item => item.replace(/&nbsp;|<b>|<br>|<i>|<\/i>|<\/b>/g,'').replace(/&gt;/g,'<').replace(/&lt;/g,'>'));
                                default :
                                    return false;
                            };
                        })}
                        </p>
                        <Icon name='comment outline'/>{search.comments.length}개의 댓글
                    </div>
                </div>
                
            </FeedBox>
            )
        })
    },[keyWord]);
    const Detail = useCallback(() => {
        return (
            <h4 className='numposter'>
                <b>{numPoster.current}</b>개의 포스트
            </h4>)
    },[numPoster])
    
    return (
        <>
            <Header />
            <SearchBox >
            <p className="explanation">KeyWord로 검색해보세요! 원하는 정보를 더 쉽고 빠르게 찾을 수 있습니다. 해당 KeyWord는 포스트의 제목 또는 내용에 매치됩니다.</p>
                <Input className="searchInput" ref={inputFocus} name={'# 키워드를 입력해주세요'} padding={'1.5%'} width={'45%'} size={'1.2rem'} onChange={onchangeValue} value={keyWord} />
                <Detail />
                {posts ? searchComponent(posts) : null}
            </SearchBox>
        </>
    )
}

export default Search;