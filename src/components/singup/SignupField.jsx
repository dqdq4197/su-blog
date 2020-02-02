import React,{useReducer,useState} from 'react';
import { Checkbox, Form } from 'semantic-ui-react'
import {Input ,Button} from '../../lib/AuthInput';
import axios from 'axios';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';

function reducer(state, action) { 
  return {
    ...state,
    [action.name]: action.value
  };
}

const Verifybox = styled.div`;
  position: relative;
  left:50%;
  padding:30px 0;
  transform: translateX(-50%);
  width:80%;
  max-height:200px;
  background-color:rgba(13,72,50,.08);
  color:rgb(13,72,50);
  border-radius:5px;
  font-size:1.5em;
`

const SignupField = () => {

  const [verify, setVerify] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    email:'',
    password: '',
    Nickname: '',
  });

  const {email,password,Nickname} = state;

  const onChangeHandler = (e) => {
    dispatch(e.target);
  }


    const mailTest = async(e) => {
      e.preventDefault();
      await axios.post('/auth/signup', {
        email,
        password,
        Nickname
      }).then((res) => {
        if(res.data === 'sent') {
          setVerify(true);
        } else if(res.data === 'already') {
          alert('이미 존재하는 이메일 주소입니다.');
        } else if(res.data === 'error') {
          alert('이메일을 다시한번 확인해주세요!');
        }
      }).catch((error) => {
        console.log(error.response);
      })
  }
    return ( 
        <>
        <h2 style={{fontSize:50,marginBottom:30}}>Create Free Account</h2>
            {verify ? <Verifybox >
              <Icon name="envelope open outline"></Icon>입력하신 메일주소로 인증메일을 요청했습니다.<br/> 해당 메일에서 인증을 완료해주세요!
             
            </Verifybox>: <form onSubmit={mailTest}>
               <Input name="email" value={email} onChange={onChangeHandler}/>
               <Input type="password" name="password" value={password} onChange={onChangeHandler}/>
               <Input name="Nickname" value={Nickname} onChange={onChangeHandler}/>
               <Form.Field>
                 <Checkbox label='I agree to the Terms and Conditions' />
               </Form.Field>
               
               <Button onClick={mailTest} width="15%" height="40px">Join</Button>
             </form>
            }
        </>
    ) 
}

export default SignupField;