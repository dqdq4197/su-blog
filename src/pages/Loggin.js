import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Loggin.css';
import {Link} from 'react-router-dom';
import ButtonExam from '../components/ButtonExam';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Nav from '../components/nav/Nav';

const Loggin = () => {
    
    const [email,setEmail] = useState([]);
    const [password,setPassword] = useState([]);
    useEffect(() => {
    },[]);
    const onchangeEmail = (e) => {
        setEmail(e.target.value);  
    }
    const onchangePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
      <div className="field_container">
        <div className="container"> 
        <Form action="/auth/login">
            <Form.Field>
              <label>Email</label>
              <input className="accfield" placeholder='heesu@blog.com' value={email} onChange={onchangeEmail} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" className="accfield" placeholder='Password' value={password} onChange={onchangePassword} />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit' className="submitbtn">Submit</Button>
        </Form>
          <Link to='/Home'><ButtonExam/></Link>
        </div>
        <div className="navi">
            <Nav />
        </div>
        {console.log(email)}
        </div>

    );
    
};


export default Loggin;



