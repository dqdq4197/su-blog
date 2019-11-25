import React,{useEffect, useState, useCallback} from 'react';
import './profile.css';
import Profile_change from './Profile_change';
import axios from 'axios';
import {profile_img_change, login} from '../../actions/authentication';
import {useDispatch, useSelector} from 'react-redux';
import Profile_edit from './Profile_edit';
import storage from '../../lib/storage';

const Profile = ({email,nick}) => {

    const {status, result} = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    

    const [phone, setPhone] = useState('');
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
                phone,
                img_path,
                id:status.currentUser.user_email
            }
        })
        .then((res) => {
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
           <form onSubmit={onSubmitForm}>
                <Profile_change onImgChange={onImgChange} path={status.currentUser.profile_img_path ? status.currentUser.profile_img_path :  result.profile_img}/>
                <Profile_edit email={email} nick={nick}/>
                <button className="formbtn">저장</button>
            </form>   
        </div>
    )
}

export default Profile;