import React from 'react';
import Nav from '../components/nav/Nav';
import Contents from '../components/post/Contents';

const Home = ({match}) => {
    
    const contents={
        marginLeft:'300px'
    }
    return (
        <div >
            <div className="navigator" >
                <Nav />
                <h2>{match.params.nick}</h2>
                {console.log(match.params.nick)}
            </div> 
               
            <div className="contents" style={contents} >           
                <Contents />
            </div>
        </div>
    );
}

export default Home;