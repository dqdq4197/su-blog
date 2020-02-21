import React,{useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import storage from '../../lib/storage';
import ProfileFaker from './ProfileFaker';


const Header = () => {
    
    const userinfo = storage.get('loginInfo');
    const [scrollFix, setScrollFix] = useState(true);

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
            left:10%;
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
            right:10%;
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
        }
    `
    //let a;

    // useEffect (() => {
    //     document.addEventListener('scroll', handleScroll)

    //     return () => {document.removeEventListener('scroll', handleScroll)
    // }})

    // const handleScroll = () => {
    //     if(a > window.scrollY){
    //        setScrollFix(true)
    //    } else if(a < window.scrollY ){ 
    //        setScrollFix(false);
    //    }
    //    a = window.scrollY;
    // }

    
    return (
        <>
            <HeaderContainer>
                <div className="logo"><Link to='/home'>Su_blog</Link></div>
                <div className="util">
                    {userinfo ? <ProfileFaker info={userinfo}/> : <span className="loginBtn"><Link to="/">로그인</Link></span>}
                </div>
            </HeaderContainer >
        </>
    )
}

export default Header;