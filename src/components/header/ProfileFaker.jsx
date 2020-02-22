import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'
import {posterModifyData} from '../../actions/posterModify';
import { logoutRequest } from '../../actions/authentication';
import { useDispatch} from 'react-redux';
import storage from '../../lib/storage';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {device} from '../../lib/MediaStyled';

const Profile_box = styled.span`
  font-size:1.1rem;
  .ui.avatar.image {
    width:35px;
    height:35px;
  }
  @media ${device.laptop} {
    font-size:1rem;
    .ui.avatar.image {
      width:28px;
      height:28px;
    }
  }
`
const ProfileFaker = ({info}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    
    const trigger = (
        <Profile_box>
          <Image avatar src={'img/' + info.profile_img} /> {info.nick}
        </Profile_box>
    )

    const goAbout =() => {
        history.push(`/about/@${info.nick}`);
    }
    
    const onclicklogout = async(e) => {
        e.preventDefault();
        dispatch(logoutRequest()).then(
            () => {
            storage.remove('loginInfo');
            history.push('/');
          } 
          )
        }
        
    const resetState = () => {
        dispatch(posterModifyData('',''));
        history.push('/postting')
    }
    
    const options = [
        { key: 'user', text: 'Account', icon: 'user', onClick:goAbout},
        { key: 'settings', text: 'Settings', icon: 'settings'},
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick:onclicklogout },
        { key: 'write', text: 'write', icon: 'write', onClick:resetState },
    ]
        
    return(
        <Dropdown
          trigger={trigger}
          options={options}
          pointing='top left'
          icon={null}
        />
  )
}

export default ProfileFaker;