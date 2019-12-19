import React from 'react';
import styled from 'styled-components';
import storage from '../../lib/storage';

const Profile_container = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:black;
    background: url(${props => props.img});
    background-size:cover;
    background-position:center center;
`

const ProfileTrigger = () => {

    const info = storage.get('loginInfo');

    return (
        <Profile_container img={info.profile_img}></Profile_container>
    )
}

export default ProfileTrigger;