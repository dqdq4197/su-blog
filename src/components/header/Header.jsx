import React,{useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import storage from '../../lib/storage';
import ProfileFaker from './ProfileFaker';
import {device} from '../../lib/MediaStyled';

const Header = () => {
    
    const userinfo = storage.get('loginInfo');
    const [scrollFix, setScrollFix] = useState(true);

    const HeaderContainer = styled.div`
        z-index:100;
        position:relative;
        top:0;
        display:flex;
        width:100%;
        height:60px;
        background-color:white;
        border-bottom:1px solid rgba(207, 201, 201,.5);
        box-shadow: 0px 12px 55px -7px rgba(0,0,0,0.12);
        .nav_util {
            width:1250px;
            margin:0 auto;
            padding-left:25px;
            padding-right:25px;
            display:flex;
            justify-content: space-between;
            @media ${device.laptopL} {
                width:1024px;
            }
        }
        .logo {
            display:flex;
            font-size:1.5rem;
            font-weight:500;
            @media ${device.laptop} {
                font-size:1.3rem;
            }
            cursor:pointer;
            a {
                display:flex;
                align-items:center;
                justify-content:center;
                color:black;
                text-decoration:none;
             }
        }
        .util {
            display:flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
            .loginBtn {
                a {
                    font-weight: 700;
                    color: rgba(0,0,0,.63);
                }
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
                <div className="nav_util">
                    <div className="logo"><Link to='/home'>Su_blog</Link></div>
                    <div className="util">
                        {userinfo ? <ProfileFaker info={userinfo}/> : <span className="loginBtn"><Link to="/">로그인</Link></span>}
                    </div>
                </div>
            </HeaderContainer >
        </>
    )
}

export default Header;