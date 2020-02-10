import React,{useState, useEffect, useRef} from 'react';
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
        margin:50px 0;
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
            background:url(${props => props.img});
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
                word-break:break-all;
                 -webkit-box-orient:vertical; 
                 -webkit-line-clamp:5;
                font-weight:500;

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
            <>
            <FeedBox  key={search.id} url={search.tumnailImg} img={search.user.profile_img}>
            <hr/>
                
                <div className="profile_box">
                    <div className="profile_pic"></div><div className='profile_author'>{search.author}</div>
                </div>
                <div className='poster_title' onClick={()=>{history.push(`/poster/${search.id}/${null}`)}}>{search.tumnailTitle}</div>
                <div className='poster_preview'>
                    {search.tumnailImg ? <div className="poster_tumnail"><img src={search.tumnailImg} /></div> : null}
                    <div className='poster_content'>
                    <p>{ search.content.blocks.map((block) => {
                            switch (block.type) {
                                case 'header': case 'paragraph':
                                    return ( <>{block.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')} <br/></> )
                                case 'list' :
                                    return block.data.items.map(item => item.replace(/&nbsp;|<b>|<\/b>/g,''));
                                default :
                                    return false;
                            };
                             
                        })}
                        </p>
                        <Icon name='comment outline'/>{search.comments.length}개의 댓글
                    </div>
                    {console.log(search)}
                </div>
                
            </FeedBox>
            </>
            )
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