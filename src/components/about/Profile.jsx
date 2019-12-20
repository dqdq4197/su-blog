import React,{useEffect, useState, useCallback} from 'react';
import ProfileChange from './ProfileChange';
import Header from '../header/Header';
import {profile_img_change} from '../../actions/authentication';
import {useDispatch, useSelector} from 'react-redux';
import ProfileEdit from './ProfileEdit';
import storage from '../../lib/storage';
import axios from 'axios';
import './profile.css';

const Profile = ({email,nick}) => {

    const {status, result} = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    
    const [img_path, setImg_path] = useState('');


    useEffect(() => {
        setImg_path(status.currentUser.profile_img_path)
    },[status.currentUser.profile_img_path])
    const onSubmitForm = async(e) => {
        e.preventDefault();
        await axios({
            url:'/auth/profile/save',
            method:'post',
            data:{
                img_path,
                id:status.currentUser.user_email
            }
        })
        .then((res) => {
            alert('프로필 정보를 저장하였습니다.')
            console.log(res.data);
            const loginInfo = storage.get('loginInfo');
            loginInfo.profile_img = res.data
            storage.set('loginInfo',loginInfo);
        })
    }

    const onImgChange = useCallback((e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('img', e.target.files[0]);
        dispatch(profile_img_change(formdata))
        console.log(e.target.files[0]);
    },[]);

    return (
        <div className="container_profile">
            <Header />
            <form onSubmit={onSubmitForm}>
                <ProfileChange onImgChange={onImgChange} path={status.currentUser.profile_img_path ? status.currentUser.profile_img_path :  result.profile_img}/>
                <ProfileEdit email={email} nick={nick}/>
                <button className="formbtn">저장</button>
            </form>   
        </div>
    )
}

export default Profile;