import React,{useState} from 'react';
import styled from 'styled-components';
import ProfileTrigger from './ProfileTrigger';
import SearchTrigger from './SearchTrigger';
import {Link} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import storage from '../../lib/storage';

const HeaderContainer = styled.div`
    z-index:100;
    position:relative;
    top:0;
    display:flex;
    width:100%;
    height:55px;
    background-color:white;
    border-bottom:1px solid rgba(207, 201, 201,.5);
    box-shadow: 0px 12px 55px -7px rgba(0,0,0,0.12);
    .logo {
        position:relative;
        height:100%;
        left:111px;
        font-size:1.3rem;
        font-weight:500;
        cursor:pointer;
        padding-top:15.24px;
        a {
            color:black;
            text-decoration:none;
         }
    }
    .util {
        position:absolute;
        height:55px;
        display:flex;
        width:auto;
        justify-content:center;
        align-items:center;
        cursor:pointer;
        right:111px;
        text-align:center;
        .loginBtn {
            a {
                font-weight: 700;
                color: rgba(0,0,0,.63);
            }
        }
        .profile {
            width:44px;
            height:44px;
            border-radius:25px;
            background-color:black;
        }
        .searchUtil { 
            margin-left:15px;
            font-size:1.2rem;
            color:rgba(0,0,0,.7);
        }
    }
`
const SearchPage = styled.div`
    position:fixed;
    display:${props => props.search ? 'block' : 'none'};
    z-index:1000;
    width:100%;
    height:100%;
    color:white;
    background-color:rgba(0,0,0,.8);
    .searchHeader {
        width:100%;
        height:100px;
        position: relative;
        .close {
            position:relative;
            color:white;
            font-size:3.5rem;
            right:70px;
            top:30px;
        }
    }
    .searchBar {
        position:relative;
        width:40%;
        left:50%;
        transform:translateX(-50%);
        top:10%;
        font-size: 2.0rem;
        color:rgba(255,255,255,.5);
        input {
            color:white;
            border:none;
            background-color:transparent;
            margin-left:10px;
            width:90%;
            &:focus {
                outline:none;
            }
        }
        hr {
            position:relative;
            width:100%;
            height:1px;
            background-color:rgba(255,255,255,.7);
            margin:10px 0 0 0 ;
        }
    }
    .contentBox {
        position:relative;
        text-align:center;
        top:160px;
        width:100%;
        height:70%;
        .content {
            text-align:left;
            display:inline-block;
            width:30%;
            height:40%;
            margin:10px 30px;
        }
    }
    
`

const Header = () => {

    const userinfo = storage.get('loginInfo');   
    const [search, setSearch ] =useState(false);

    const searchOpen = () => {
        setSearch(!search);
    };
    const searchClose = () => {
        setSearch(!search);
    }
    return (
        <>
            <SearchPage search={search}>
                <div className="searchHeader" onClick={searchClose} >
                    <span className="close"><Icon name="close"></Icon></span>
                </div>
                <div className="searchBar">
                    <label htmlFor="search"><Icon name="search" /></label><input id="search" type="text" placeholder="Search"/>
                    <hr/>
                </div>
                <div className="contentBox">
                    <div className="content">
                        <span>태그</span>
                    </div>
                    <div className="content">
                        <span>최신글</span>
                    </div>  
                    <div className="content">
                        <span>최신 댓글</span>
                    </div>
                    <div className="content">
                        <span>공지사항</span>
                    </div>  
                </div> 
            </SearchPage>
            <HeaderContainer >
                <div className="logo"><Link to='/home'>Su_blog</Link></div>
                <div className="util">
                    {userinfo ? <ProfileTrigger nick={userinfo.nick}/>: <span className="loginBtn"><Link to="/">로그인</Link></span>} 
                    <div className="searchUtil" onClick={searchOpen} ><Icon name="search" /></div>
                </div>
            </HeaderContainer >
        </>
    )
}

export default Header;