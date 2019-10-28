import React from 'react';
import Nav from '../components/Nav';
import Contents from '../components/Contents';

const Home = () => {
    
    const contents={
        marginLeft:'300px'
    }
    return (
        <div >
            <div className="navigator" >
                <Nav />
            </div> 
            <div className="contents" style={contents} >           
                <Contents />
            </div>
        </div>
    );
}

export default Home;