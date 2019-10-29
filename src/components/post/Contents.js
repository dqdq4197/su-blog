import React from 'react';
import './contents.css';

const Contents = () => {

   const post = {
      width:'20%',
      height:'200px',
      border:'1px solid black',
      display:'inline-block'
   }

    return (
        <div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>
           <div className="post" style={post}></div>

        </div>
    );
}

export default Contents;