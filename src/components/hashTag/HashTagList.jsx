import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import SearchTag from './SearchTag';
import axios from 'axios';


const ListContainer = styled.div`
    width:100%;
    height:100%;
    background-color:#fafbfc;
    text-align:center;
`
const HashTagList = () => {

    
    return(
        <>
            <ListContainer >   
                <SearchTag />
            </ListContainer>
        </>

    )
}

export default HashTagList;