import React,{useState,useCallback} from 'react';
import styled from 'styled-components';
import { logoutRequest } from '../../actions/authentication';
import { useDispatch} from 'react-redux';
import {Link ,useHistory} from 'react-router-dom';
import storage from '../../lib/storage';
import {posterModifyData} from '../../actions/posterModify';


const ProfileContainer = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:black;
    background: url(${props => props.img});
    background-size:cover;
    background-position:center center;
`
const ProfileUtil = styled.div`
    position:absolute;
    display:${props => props.show ? "block" : "none"};
    overflow:hidden;
    top:48px;
    left:4px;
    width:130px;
    height:124px;
    background-color:#fff;
    border: 1px solid rgba(34,36,38,.15);
    border-radius:.2rem;
    ul{
        list-style:none;
        margin:0;
        padding:0;
        li{
            &:first-child {
                margin-bottom:3px;
            }
            a {
                color:black;
                text-decoration:none;
            }
            color:rgba(0,0,0,.5);
            font-weight:500;
            &:not(:first-child) {
                color:black;
                height:25px;
                &:hover {
                    background-color:rgba(0,0,0,.05);
                }
            }
        }
    }
`

const ProfileTrigger = ({nick}) => {

    const info = storage.get('loginInfo');
    const [click, setClick] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();


    const onClickProfile = useCallback(() => {
        setClick(!click);
    });

    const onclicklogout = async(e) => {
        e.preventDefault();
        dispatch(logoutRequest()).then(
          () => {
            storage.remove('loginInfo');
            history.push('/');
          } 
        )
    }

    const resetState = () => {
        dispatch(posterModifyData('',''));
    }
    return (
        <>
            <ProfileContainer onClick={onClickProfile} img={'img/'+info.profile_img}></ProfileContainer>
            <ProfileUtil show={click}>
                <ul>
                    <li>Hello, {nick}!</li>
                    <li><Link to={`/about/@${nick}`}>Your Profile</Link></li>
                    <li>Settings</li>
                    <li onClick={resetState}><Link to="/postting">Write</Link></li>
                    <li onClick={onclicklogout}>Sign Out</li>
                </ul>
                
            </ProfileUtil>
        </>
    )
}

export default ProfileTrigger;