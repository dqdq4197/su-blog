import React from 'react';
import {Link} from 'react-router-dom';
const Test = ({id}) => {

    console.log(id);
    return (
        <Link to={`/home/:${id}`}><div>id</div></Link>
    )
}

export default Test