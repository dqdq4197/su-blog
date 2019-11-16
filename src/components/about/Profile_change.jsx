import React,{useState,useEffect} from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';


const Profile_change= () => {
    

    const [file, setFile] = useState(null);
        
    useEffect(() => {

    },[])
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('img',file);
        axios.post('/auth/profile/img',formdata)
        .then((res) => {
            console.log(res.data.url);
            console.log('res',res.JSON.parse(res).url)
        }).catch((error) => {
        });
    }
    const onImgChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    return (
        <>
        <img id="thumnail" className="profile_pic" src="" />
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
                    <form onSubmit={onFormSubmit} className="profile_change_form" action="/auth/profile/img" method="post" encType="multipart/form-data">
                        <label for="profile_change_input"></label>
                        <input onChange={onImgChange} id="profile_change_input" name="img" type="file" accept="image/*"></input>
                        <button className="confirm">확인</button>
                    </form>
                    <Dropdown.Item
                    label={{ color: 'green', empty: true, circular: true }}
                    text='프로필 삭제'
                    />
                    {/*}<form className="profile_change_form" action="/auth/profile" method="post" encType="multipart/form-data">
                        <label for="profile_change_input"></label>
                        <input id="profile_change_input" type="file" accept="image/*"></input>
        </form>{*/}
                 </Dropdown.Menu>

            </Dropdown>
        </div>
    </>
    )
}

export default Profile_change;