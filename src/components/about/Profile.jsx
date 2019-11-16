import React,{useEffect, useState} from 'react';
import './profile.css';
import Profile_change from './Profile_change';
import axios from 'axios';


const Profile = ({email,nick}) => {
    const [profile_img, setProfile_img] = useState(document.getElementById('profile_change_input'));

    
    
    return (
        <div className="container_profile">
            <div className="profile">
                
                <Profile_change />
            </div>
            <h2>소개</h2>
            <p>
                안녕하세요,저는 React Router 공부중입니다.
                이메일: {email}
                닉네임: {nick}
            </p>           
        </div>
    )
}

export default Profile;