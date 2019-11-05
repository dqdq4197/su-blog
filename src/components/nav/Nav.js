import React,{useState}  from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
 const Nav = () =>  {
  const [activeItem, setActiveItem] =useState('');

  const handleItemClick = (name) => setActiveItem(name);
  const container = {
    height:'100vh',
    position:'fixed'
};  
  const item = {
      marginTop:'60px'
  } 
    return (
      <Menu size='large' vertical style={container}>
        <Menu.Item style={item}>
          <Menu.Header>Products</Menu.Header>
          <Menu.Menu >
            <Menu.Item
              name='enterprise'
              active={activeItem === 'enterprise'}
              onClick={handleItemClick}
            />
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
          <Link to='/auth/logout'>
            <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={handleItemClick}
            />
          </Link>
              <Menu.Item
                name='About'
                active={activeItem === 'About'}
                onClick={handleItemClick}
              />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
}

export default Nav;