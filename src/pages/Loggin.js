import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Loggin.css';
import {Link} from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Nav from '../components/nav/Nav';
import axios from 'axios';

const Loggin = () => {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    useEffect(() => {
    },[]);
    const onSubmitHandler = (e) => {
      e.preventDefault();
      axios({
        url: "/auth/login",
        method: "POST",
        data : {
          email,
          password
        }
      })
      .then(res => {
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log("Error: ", error.res);
      })
    }
    const onchangeEmail = (e) => {
        setEmail(e.target.value);  
    }
    const onchangePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
      <div className="field_container">
        <div className="container"> 
          <Form onSubmit={onSubmitHandler}>
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
            <Link to='/Home'><HomeButton/></Link>
        </div>
        <div className="navi">
            <Nav />
        </div>
        </div>

    );
    
};


export default Loggin;



