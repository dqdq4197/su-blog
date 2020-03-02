import React,{useEffect} from 'react';
import SetImage from './SetImage';
import axios from 'axios';
import storage from '../../lib/storage';
import styled from 'styled-components';
import SetDetail from './SetDetail';

const ProfBox = styled.div`
    width:800px;
    padding:10px;
    padding-top:60px;
    margin:50px auto 0;

` 

const SetWrap = () => {
    const userInfo = storage.get('loginInfo');
    

    return (
            <ProfBox>
                <SetImage data={userInfo} />
                <SetDetail data={userInfo}/>    
            </ProfBox>
    )
}

export default SetWrap;
