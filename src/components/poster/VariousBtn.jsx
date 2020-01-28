import React from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {posterModifyData} from '../../actions/posterModify';

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

const VariousBtn = ({posterId, author,data}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const deleteOnclick = async() => {
        await axios.post(`/post/delete/${posterId}/${author}`)
        .then((res) => {
            alert(res.data);
            history.push('/home');
        })

        console.log(posterId);
    }
    
    const onClickModify = () => {
        dispatch(posterModifyData(posterId,data))
    }

    return (
        <BtnContainer>
            <button className="deletebtn" onClick={deleteOnclick}> 글삭제 </button>
            <Link to={'/postting'}> <button className="deletebtn" onClick={onClickModify}>글 수정</button> 
            </Link>
        </BtnContainer>
    )
}

export default VariousBtn;