import React,{useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {  Checkbox } from 'semantic-ui-react'
import {Input,Button }from '../../lib/AuthInput';





function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const LoginField = ({onSubmitHandler}) => {

    const [state, dispatch] = useReducer(reducer, {
      email: '',
      password: '',
    });
    const {email, password} = state;
    const onChangeHandler = (e) => {
      dispatch(e.target);
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        await onSubmitHandler(email,password);
    }
  

    return (      
      <> 
       <h2 style={{fontSize:50,marginBottom:30}}>Sing in to Su_blog</h2>
        <form onSubmit={handleLogin}>
          <Input name="email" value={email} onChange={onChangeHandler}/>
          <Input type="password" name="password"  value={password} onChange={onChangeHandler} />
          <div>
            <Checkbox label='I agree to the Terms and Conditions' />
          </div>
            <Button width="15%" height="40px" type='submit' className="submitbtn">SingIn</Button>
        </form>
      </>
      
    )
}

export default LoginField;