import React from 'react';
import {useSelector} from 'react-redux';
import Profile from '../components/about/Profile';

const About = () => {

    const {result} = useSelector(state => state.authentication)
    return (
        <>
            {result ? ( <Profile
             email={result.email}
             nick= {result.nick}
            /> ) : "...isLoading"}
        </>
    );
};

export default About;