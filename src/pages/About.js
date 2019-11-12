import React from 'react';
import {useSelector} from 'react-redux';

const About = () => {
    const user = useSelector(state => state.authentication)
    return (
        <div>
            <h2>소개</h2>
            <p>
                안녕하세요,저는 React Router 공부중입니다.
                이메일: {user.status.currentUser}
            </p>
        </div>
    );
};

export default About;