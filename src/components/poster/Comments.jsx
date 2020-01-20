import React,{useState} from 'react';
import styled from 'styled-components';
import {Button} from '../../lib/AuthInput';
import axios from 'axios';
import storage from '../../lib/storage';


const CommentContainer = styled.div`
    width:100%;
    height:500px;
    form {
        text-align:right;
    }
    textarea {
        width:100%;
        height:100px;
    }
`


const Comments = ({postId,data}) => {
    const [value, setValue] = useState('');
    const userInfo = storage.get('loginInfo');

    const onEnter = (e) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }

    const onSubmit = () => {
        axios.post(`/post/reply/${userInfo.nick}`, {
            value,
            postId,
        })
    }
    return (
        <>
        <h3>Comments....</h3>
        {data[0] && data.map(res=> <h5 key={res.id}>{res.content}</h5>)}
        {data[0] && data.map(res=> <h5 key={res.id}>{console.log(res)}</h5>)}
        <CommentContainer>
            <form>
                <textarea onChange={onEnter} value={value}></textarea>
                <Button onClick={onSubmit}>댓글 작성</Button>
            </form>
        </CommentContainer>
        </>
    )
}

export default Comments;