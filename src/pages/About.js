import React from 'react';
import {useSelector} from 'react-redux';
import Profile from '../components/about/Profile';

const About = () => {
    const user = useSelector(state => state.authentication)
    return (
        <>
            <Profile
             email={user.status.currentUser.user_email}
             nick= {user.status.currentUser.user_nick}
            />
        </>
    );
};

export default About;