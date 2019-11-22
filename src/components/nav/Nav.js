import React,{useState}  from 'react'
import { Menu } from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { logoutRequest } from '../../actions/authentication';
import styled from 'styled-components';



const NaviContainer = styled.div`
    position:relative;
    width: 22.2%;
    height: 100vh;
`

 const Nav = () =>  {

  const user = useSelector(state => state.authentication)
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] =useState('');
  const history = useHistory();
  const handleItemClick = (name) => {setActiveItem(name);console.log(activeItem)}
  const onclicklogout = async(e) => {
    e.preventDefault();
    dispatch(logoutRequest()).then(
      () => {
        history.push('/');
        console.log(user.status.isLoggedIn)
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
        active={activeItem === 'LogIn'}
        onClick={onclicklogout}
      />
    </Link>
  )
  const logoutButton = (
    <>
      <Menu.Item
          name='Logout'
          active={activeItem === 'Logout'}
          onClick={onclicklogout}
      />
      <Link to="/about">
      <Menu.Item
          name='About'
          active={activeItem === 'About'}
          onClick={handleItemClick}
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
              active={activeItem === 'enterprise'}
              onClick={handleItemClick}
            /></Link>
            <Link to='/about'>
              <Menu.Item
                name='About'
                active={activeItem === 'About'}
                onClick={handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>CMS Solutions</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name='rails'
              active={activeItem === 'rails'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='python'
              active={activeItem === 'python'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='php'
              active={activeItem === 'php'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Postting</Menu.Header>

          <Menu.Menu>
            <Link to='/Postting'>
              <Menu.Item
              name='Write'
              active={activeItem === 'Write'}
              onClick={handleItemClick}
              />
            </Link>
            <Menu.Item
              name='Mypost'
              active={activeItem === 'Mypost'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='email'
              active={activeItem === 'email'}
              onClick={handleItemClick}
            >
              E-mail Support
            </Menu.Item>

            <Menu.Item
              name='faq'
              active={activeItem === 'faq'}
              onClick={handleItemClick}
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item style={item}>
          <Menu.Header>내정보</Menu.Header>
          <Menu.Menu >
            {user.status.isLoggedIn ? logoutButton : loginButton}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
      </NaviContainer>
    )
}

export default Nav;