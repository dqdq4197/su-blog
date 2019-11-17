import React,{useEffect, useState, useCallback} from 'react';
import './profile.css';
import Profile_change from './Profile_change';
import axios from 'axios';
import {profile_img_change} from '../../actions/authentication';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({email,nick}) => {

    const user = useSelector(state => state.authentication.status.currentUser);
    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [img_path, setImg_path] = useState('');

    useEffect(() => {
        setImg_path(user.profile_img_path)
    },[user.profile_img_path])

    const onChangeValue = (e) => {
        return setPhone(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        axios({
            url:'/auth/profile/save',
            method:'post',
            data:{
                phone,
                img_path,
                id:user.user_email
            }
        })
        .then((res) => {
            console.log(res);
        })
    }

    const onImgChange = useCallback((e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('img', e.target.files[0]);
        dispatch(profile_img_change(formdata))
        console.log(e.target.files[0]);
    },[])

    return (
        <div className="container_profile">
            <form onSubmit={onSubmitForm}>
                <Profile_change onImgChange={onImgChange} path={user.profile_img_path}/>
                <h2>소개</h2>
                <p>
                    안녕하세요,저는 React Router 공부중입니다.
                    <br/>
                    이메일: {email}
                    <br/>
                    닉네임: {nick}
                </p> 
                전화번호 : <input type='tel' name="phone" value={phone} onChange={onChangeValue}></input>         
                <br/>
                <button>저장</button>
            </form>    
        </div>
    )
}

export default Profile;