import React,{useEffect} from 'react';
import { Dropdown } from 'semantic-ui-react';


const Profile_change= ({onImgChange, path}) => {
    

    
    useEffect(() => {
        if(path) {
            document.getElementById('thumnail').style.display='block'
            console.log(path)
        }
    },[path])
    
    return (
        <div className="profile_img_container">
        <div className="profile">
            <img style={{width:150, heigth:150}} id="thumnail" src={path} alt=""/> 
        </div>
        <div className="profile_change_dropdown">
            <Dropdown
                icon='setting'
                button
                className='icon'
            >
                <Dropdown.Menu>
                   <Dropdown.Item
                    label={{ color: 'red', empty: true, circular: true }}
                    text='프로필 바꾸기'
                    />
                    <div className="profile_change_container">
                        <label for="profile_change_input"></label>
                        <input onChange={onImgChange} id="profile_change_input" name="img" type="file" accept="image/*"></input>
                    </div>
                    <Dropdown.Item
                        label={{ color: 'green', empty: true, circular: true }}
                        text='프로필 삭제'
                    />
                 </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
    );
}

export default Profile_change;