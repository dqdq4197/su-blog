import React,{useEffect, useState, useCallback} from 'react';
import ProfileChange from './ProfileChange';
import Header from '../header/Header';
import {profile_img_change} from '../../actions/authentication';
import {useDispatch, useSelector} from 'react-redux';
import ProfileEdit from './ProfileEdit';
import ProfileFeed from './ProfileFeed';
import storage from '../../lib/storage';
import axios from 'axios';
import './profile.css';
import styled from 'styled-components';




const ProfileContainer = styled.div`
    display:flex;
    width:100%;
    height:300px;
    background-color:transparent;
    .profile_box {
        flex:3;
        height:100%;
        background-color:transparent;
        .profile {
            position:relative;
            top:50%;
            left:60%;
            transform:translate(-50%,-50%);
            width:200px;
            text-align:center;
        }
        .profile_pic {
            width:200px;
            height:200px;
            border-radius:200px;
            background:url(${props => props.img});
            background-size:cover;
            background-position:center center;
        }
        p {
            color:#99aab5;
            font-size:1.5rem;
            font-weight:600;
        }
    }
    .intro {
        flex:4;
        height:100%;
        background-color:rgba(13,72,50,.1);
        padding-left:5%;
        font-weight:500;
        font-size:1.5rem;
    }

`
const Profile = ({profile,nick}) => {

    //const {status, result} = useSelector(state => state.authentication);
    //const dispatch = useDispatch();
    //
    //const [img_path, setImg_path] = useState('');
    const [info, setInfo] = useState(null);
    //useEffect(() => {
    //    setImg_path(status.currentUser.profile_img_path)
    //},[status.currentUser.profile_img_path])
    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        axios.get(`/about/${nick}`).then((res) => {
            console.log(res.data);
            setInfo(res.data);
        })
    }
    // const onSubmitForm = async(e) => {
    //     e.preventDefault();
    //     await axios({
    //         url:'/auth/profile/save',
    //         method:'post',
    //         data:{
    //             img_path,
    //             id:status.currentUser.user_email
    //         }
    //     })
    //     .then((res) => {
    //         alert('프로필 정보를 저장하였습니다.')
    //         console.log(res.data);
    //         const loginInfo = storage.get('loginInfo');
    //         loginInfo.profile_img = res.data
    //         storage.set('loginInfo',loginInfo);
    //     })
    // }

    // const onImgChange = useCallback((e) => {
    //     e.preventDefault();
    //     const formdata = new FormData();
    //     formdata.append('img', e.target.files[0]);
    //     dispatch(profile_img_change(formdata))
    //     console.log(e.target.files[0]);
    // },[]);
    console.log(info)
    return (
        <>
            <Header />
            <div className="left"></div>
            <div className=""></div>
            {info ? <>
            <ProfileContainer img={'img/'+profile.profile_img}>
                <div className="profile_box"><div className="profile"><div className="profile_pic" /><p>{nick.substr(1,nick.length+1)}</p></div></div>
                <div className="intro"></div>
                <ProfileFeed user={info} />
            </ProfileContainer> 
            <ProfileFeed data={info} />
            </> : null}
            
            {/* <form onSubmit={onSubmitForm}>
                <ProfileChange onImgChange={onImgChange} path={status.currentUser.profile_img_path ? status.currentUser.profile_img_path :  result.profile_img}/>
                <ProfileEdit email={email} nick={nick}/>
                <button className="formbtn">저장</button>
            </form>    */}
        </>
    )
}

export default Profile;