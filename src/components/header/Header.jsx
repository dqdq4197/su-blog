import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import ProfileTrigger from './ProfileTrigger';
import { logoutRequest } from '../../actions/authentication';
import {useSelector, useDispatch} from 'react-redux';
import {Link ,useHistory} from 'react-router-dom';
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

const Header = () => {
    
    const {result} = useSelector(state=> state.authentication);
    const userinfo = storage.get('loginInfo');
    const dispatch = useDispatch();
    const history = useHistory();

    const onclicklogout = async(e) => {
        e.preventDefault();
        dispatch(logoutRequest()).then(
          () => {
            storage.remove('loginInfo');
            history.push('/');
          } 
        )
      }


    return (
        <>
            <HeaderContainer >
                <div className="logo"><Link to='/home'>Su_blog</Link></div>
                <div className="util">
                    {userinfo ? <ProfileTrigger  />: ""} 
                    <div className="searchUtil"><Icon name="search" /></div>
                    <div onClick={onclicklogout}>logout</div>
                    <div><Link to="/postting">writer</Link></div>
                </div>
            </HeaderContainer >
        </>
    )
}

export default Header;