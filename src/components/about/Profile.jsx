import React from 'react';


const Profile = ({email,nick}) => {
    return (
        <div className="container_profile">
            <form action="/profile_upload" method="post" encType="multipart/form-data">
                <div className="profile_thumnail">
                    <img hidden src="" alt="thumnail"/>
                     <input id="img" type="file" accept="image/*"/>
                </div>
                <button for="img" className="change_btn" >프로필 바꾸기</button>
            </form>
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