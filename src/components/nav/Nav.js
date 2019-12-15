import React  from 'react'
import { Menu } from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { logoutRequest } from '../../actions/authentication';
import styled from 'styled-components';
import storage from '../../lib/storage';


const NaviContainer = styled.div`
    position:relative;
    width: 22.2%;
    height: 100vh;
    a { 
      color: black;
    }
`

 const Nav = () =>  {
  const isLoggedIn = storage.get('loginInfo');
  const user = useSelector(state => state.authentication)
  const dispatch = useDispatch();
  const history = useHistory();
  const onclicklogout = async(e) => {
    e.preventDefault();
    dispatch(logoutRequest()).then(
      () => {
        storage.remove('loginInfo');
        history.push('/');
      } 
    )
  }
    
  const container = {
    height:'100vh',
    position:'fixed'
};  
  const item = {
      marginTop:'60px'
  } 
  const loginButton = (
    <Link to="/">
      <Menu.Item
        name='LogIn'
        onClick={onclicklogout}
      />
    </Link>
  )
  const logoutButton = (
    <>
      <Menu.Item
          name='Logout'
          onClick={onclicklogout}
      />
      <Link to="/about">
      <Menu.Item
          name='About'
      />
      </Link>
    </>
  );

    return (
      <NaviContainer>
      <Menu size='large' vertical style={container}>
        <Menu.Item style={item}>
          <Menu.Header>Products</Menu.Header>
          <Menu.Menu >
            <Link to='/poster'><Menu.Item
              name='enterprise'
            /></Link>
            <Link to='/about'>
              <Menu.Item
                name='About'
              />
            </Link>
          </Menu.Menu>
        </Menu.Item>
        
        <Menu.Item>
          <Menu.Header>CMS Solutions</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name='React'
            />
            <Menu.Item
              name='Node'     
            />
            <Menu.Item
              name='Javascript'
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Posting</Menu.Header>
          <Menu.Menu>
            <Link to='/Postting'>
              <Menu.Item
              name='Write'
              />
            </Link>
            <Menu.Item
              name='Mypost'
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Support</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name='email'
            >
              E-mail Support
            </Menu.Item>

            <Menu.Item
              name='faq'
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>내정보</Menu.Header>
          <Menu.Menu >
            {isLoggedIn ? logoutButton : loginButton}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
      </NaviContainer>
    )
}

export default Nav;