import React from 'react';
import {Icon} from 'semantic-ui-react';
import styled from 'styled-components';


const SearchPage = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-color:black;

`

const SearchTrigger = () => {
    return (
        <>
            <div className="searchUtil"><Icon name="search" /></div>
        </>
    )
}

export default SearchTrigger;