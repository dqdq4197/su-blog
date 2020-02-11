import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import Profile from '../components/about/Profile';

const About = ({match}) => {
    
    useEffect(()=> {
        window.scrollTo(0,0)
    },[])
    const {result} = useSelector(state => state.authentication)
    return (
        <>
            <Profile profile={result} nick={match.params.nick}/>
        </>
    );
};

export default About;