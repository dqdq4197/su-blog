import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import storage from '../lib/storage';

const HeaderContainer = styled.div`
    z-index:100;
    position:fixed;
    width:100%;
    height:55px;
    background-color:white;
    border-bottom:1px solid rgba(207, 201, 201,.5);
    box-shadow: 0px 12px 55px -7px rgba(0,0,0,0.42);
    
    .util {
        position:absolute;
        display:flex;
        cursor:pointer;
        right:100px;
        text-align:center;
        .profile {
            width:44px;
            height:44px;
            border-radius:25px;
            background-color:black;
        }
        .searchUtil {
            background-color:white;
            width:80px;
            height:55px;
            font-size:1.3rem;
            color:black;
            border:1px solid rgba(196, 191, 191,.6);
            border-width:0 2px;
            padding-top:12px;
            
        }
    }
`

const Header = () => {

    const {result} = useSelector(state=> state.authentication);
    const userinfo = storage.get('loginInfo');
    return (
        <>
            <HeaderContainer > 
                <div className="util">
                    {userinfo ? <div className="profile" ></div> : ""} 
                    <div className="searchUtil"><Icon name="search" /></div>
                </div>
            </HeaderContainer >
        </>
    )
}

export default Header;