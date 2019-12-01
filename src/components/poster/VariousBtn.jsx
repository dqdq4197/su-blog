import React from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import {useHistory} from 'react-router-dom';

const BtnContainer = styled.div`
    margin-top: 60px;
    .deletebtn {
      right:0px;
      border:1px solid rgb(0,0,0);
      border-radius:3px;
      width:75px;
      height:35px;
      background-color: transparent;

      &:hover {
        background-color: #e6ebf1;
        border-color: #2969b9;
      }
    }
`

const VariousBtn = ({posterId, author}) => {

    const history = useHistory();

    const deleteOnclick = async() => {
        await axios.post(`/post/delete/${posterId}/${author}`)
        .then((res) => {
            alert(res.data);
            history.push('/home');
        })

        console.log(posterId);
    }
    

    return (
        <BtnContainer>
            <button className="deletebtn" onClick={deleteOnclick}> 글삭제 </button>
        </BtnContainer>
    )
}

export default VariousBtn;