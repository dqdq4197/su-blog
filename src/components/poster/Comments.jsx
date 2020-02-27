import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {Button} from '../../lib/AuthInput';
import axios from 'axios';
import {Icon} from 'semantic-ui-react';
import storage from '../../lib/storage';
import TimeAgo from '../../lib/TimeAgo';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

const CommentContainer = styled.div`
    width:100%;
    height:500px;
    margin-top:30px;
    form {
        text-align:right;
    }
    textarea {
        width:100%;
        height:100px;
    }
`
const ReplyBox = styled.div`
    position:relative;
    margin-top:15px;
    &.childReply {
        margin-left:60px;
    }
    .profile {
        position:relative;
        display:inline-block;
        width:35px;
        height:35px;
        top:10px;
        border-radius:20px;
        background-color:black;
        background:url(${props =>'img/'+ props.path});
        background-position:center center;
        background-size:cover;
    }
    .profile_info {
        a {
            color:black;
        }
        .author {
            font-weight:500;
            font-size:1rem;
        }
        .date {
            div {
                display:inline-block;
            }
            font-weight:400;
            font-style: normal;
            font-size: 0.9em;
            color:rgba(0,0,0,.4);
            margin-left:6px;
        }
        display:inline-block;
        margin-left:10px;
    }
    .delete {
        position:relative;
        cursor:pointer;
        color:rgba(0,0,0,.5);
        font-size:.8rem;
        left:10px;
    }
    .comment {
        line-height:22px;
        margin:10px 0 5px 45px;
        color:#484848;
        word-break:keep-all;
    }
    .reply {
        margin:5px 0 0 22px;
        font-size:.9em;
        color:rgba(0,0,0,0.67);
        cursor:pointer;
        &:hover {
            color:rgba(0,0,0,.9);
        }
    }
    
    .replyBox {
        text-align:right;
        width:100%;
        height:120px;
        textarea {
            width:94%;
            height:100px;
            margin:10px 0 0 28px;
            resize:none;
        }
    }
`


const Comments = ({postId}) => {
    const [parentValue, setParentValue] = useState('');
    const [childValue, setChildValue] = useState('');
    const [reply, setReply] = useState(null);
    const [comments, setComments] = useState('');

    const userInfo = storage.get('loginInfo');

    useEffect(() => {
        getComment()
    },[])

    const onChangeParent = (e) => {
        setParentValue(e.target.value)
    }

    const onChangeChild = (e) => {
        setChildValue(e.target.value);
    }
    const onClickReply = (index) => {
        reply === index+1 ? setReply( null ) :setReply(index + 1) ;
    }

    const getComment = () => {
         axios.get(`/comment/${postId}`).then((res) =>{
            let array=[]; 
            let array1=[];
  
            res.data.map((dap) => {!dap.parent && array.push(dap)});
            array1=res.data.filter(dap1 => dap1.parent !== null ).reverse();
            array1.map(dap2 => {
              array.map((dap3,i) => dap2.parent === dap3.id ? array.splice(i+1,0,dap2) : null)})
            setComments(array);
          })
        }

    const onReplyParent = (e) => {
        e.preventDefault();
        if(parentValue) {
            axios.put(`/comment/parentReply/${userInfo.nick}`, {
                parentValue,
                postId,
        }).then(() => {
            getComment();
            setParentValue('');
        })} else {
            e.preventDefault();
        }
    }
    
    const onReplyChild = (e,replyId) => {
        e.preventDefault();
        axios.put(`/comment/childReply/${userInfo.nick}`, {
            replyId,
            childValue,
            postId
        }).then(() => {
            getComment();
            setChildValue('');
            document.getElementById(replyId).focus();
        })
    }
    

    const test = (res) => (
         <ReplyBox className='childReply' key={res.id} path={res.profile_img}>
            <Link to={`/about/@${res.author}`} ><div className="profile"></div></Link>
            <div className="profile_info">
                <Link to={`/about/@${res.author}`} ><span className="author">{res.author}</span></Link>
                <span className="date"><TimeAgo date={res.createdAt} locale="en" /></span>
            </div>
            <span className="delete" onClick={() => onDelteReply(res.id,res.author)} ><Icon name="trash alternate"/></span>
            <div className="comment">{res.content}</div>
        </ReplyBox>
    )
    
    const onDelteReply = (id,author) => {
        if(userInfo.nick !== author){ 
            alert('삭제할 권한이 없습니다.');
        } else {
            axios.delete(`/comment/delete/${id}`).then(() => getComment())
        }
    }


    return (
        <>
        <h3 id='commentView' style={{marginTop:30}}>{comments.length} 답변</h3>
        <hr style={{backgroundColor:'rgba(0,0,0,.6)'}} />
        {comments[0] && comments.map(
            (res, i) => res.seq === 1 ? <ReplyBox id={res.id} key={res.id} path={res.profile_img}>
                        <Link to={`/about/@${res.author}`} ><div className="profile"></div></Link>
                        <div className="profile_info">
                            <Link to={`/about/@${res.author}`} ><span className="author">{res.author}</span></Link>
                            <span className="date"><TimeAgo date={res.createdAt} locale="en" /></span>
                        </div>
                        <span className="delete" onClick={() => onDelteReply(res.id,res.author)} ><Icon name="trash alternate"/></span>
                        <div className="comment">{res.content}</div>
                        <span className="reply" onClick={()=>onClickReply(i)}><Icon name="reply" /> 댓글 달기</span>
                    {reply && (i===reply -1 ) ?
                        <div className="replyBox">
                        <form>
                            {userInfo ? <textarea onChange={onChangeChild} value={childValue}></textarea> : <textarea readOnly placeholder='로그인이 필요합니다.'></textarea>}
                            <Button onClick={(event) => onReplyChild(event,res.id)} width="70px" size='.85rem'>댓글 작성</Button>
                        </form>
                        </div> : null}
                    </ReplyBox> : 
                        test(res)
        )}
        <CommentContainer>
            <hr />
            <form>
                {userInfo ? <textarea onChange={onChangeParent} value={parentValue}></textarea> : <textarea readOnly placeholder='로그인이 필요합니다.'></textarea> }
                <Button onClick={onReplyParent}>댓글 작성</Button>
            </form>
        </CommentContainer>
        </>
    )
}

export default Comments;