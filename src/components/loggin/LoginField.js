import React,{useReducer} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'


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
        <Form onSubmit={handleLogin}>
            <Form.Field>
              <label>Email</label>
              <input name="email" className="accfield" placeholder='heesu@blog.com' value={email} onChange={onChangeHandler} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" name="password" className="accfield" placeholder='Password' value={password} onChange={onChangeHandler} />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit' className="submitbtn">SingIn</Button>
            <Link to='/Signup'><Button>SignUp</Button></Link>
        </Form>
      </>
      
    )
}

export default LoginField;