import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
const LoginField = ({onSubmitHandler}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async() => {
        await onSubmitHandler(email,password);
    }
    const onchangeEmail = (e) => {
        setEmail(e.target.value);  
    }
    const onchangePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        
      
      <> 
        <Form onSubmit={handleLogin}>
            <Form.Field>
              <label>Email</label>
              <input name="email" className="accfield" placeholder='heesu@blog.com' value={email} onChange={onchangeEmail} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" name="password" className="accfield" placeholder='Password' value={password} onChange={onchangePassword} />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit' className="submitbtn">SingIn</Button>
            <Link to='/Singup'><Button>SingUp</Button></Link>
        </Form>
      </>
      
    )
}

export default LoginField;