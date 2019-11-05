import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Loggin.css';
import {Link, useHistory, Redirect} from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Nav from '../components/nav/Nav';
import axios from 'axios';

const Loggin = () => {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [logginError, setLogginError] = useState("");
    const [islogging, setIslogging] = useState(false);

    useEffect(() => {
    },[]);
    const history = useHistory();
    const onSubmitHandler = async(e) => {
      e.preventDefault();
     await axios({
        url: "/auth/login",
        method: 'POST',
        data: {
            email,
            password,
        }
      })
      .then((response)=> {
        console.log(response.data)
        const isAutenticated = response.data.nick;
        window.localStorage.setItem('isAuthenticated',isAutenticated);
        setIslogging(true);
        history.push(`/Home/${response.data.nick}`);
        
      })
      .catch((error) =>{
          setLogginError(error.response.data.message);
          alert(logginError);
      }); 
    }
    

    const onchangeEmail = (e) => {
        setEmail(e.target.value);  
    }
    const onchangePassword = (e) => {
        setPassword(e.target.value);
    }
    const isAutenticated = window.localStorage.getItem('isAuthenticated');
    // {isAutenticated ? <Redirect to="/Home" /> : null}
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