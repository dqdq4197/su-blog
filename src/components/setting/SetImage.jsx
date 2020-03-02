import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import {Button} from '../../lib/AuthInput';
import {useDispatch, useSelector} from 'react-redux';
import {profile_img_change} from '../../actions/authentication';
import storage from '../../lib/storage';

const Container = styled.div`
    display:flex;
    .setImageBox {
        width:200px;
        height:200px;
        text-align:center;
        .deleteBtn {
            background-color:white;
            border:1px solid #008000;
            color:#008000;
        }
        label {
            width:100%;
            height:100%;
            cursor:pointer;
            padding-top:4px;
        }
        #profile_change_input {
            display:none;
        }
    }
    .basicInfo {
        margin-left:25px;
        font-weight:600;
        color:#90A4AE;
        h2,h4 {
            color:black;
            margin-left:10px;
        }
    }

`
const useStyles = makeStyles(theme => ({
    large: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  }));

    

const SetImage = ({data}) => {
    const [path, setPath] = useState(data.profile_img);
    const {status} = useSelector((state) => state.authentication);
    const dispatch = useDispatch();
    const classes = useStyles();


    const onImgChange = useCallback((e) => {
        e.preventDefault();
        const formdata = new FormData();
        dispatch(profile_img_change(formdata, data.nick)).then((res) => {setPath(res)})
        formdata.append('img', e.target.files[0]);
        console.log(e.target.files[0]);
    },[]);
    
    const onDeleteImg = () => {
        const basicPath = 'basic.png';
        dispatch(profile_img_change(basicPath, data.nick)).then((res) => {setPath(basicPath)})

    }
    return (
        <Container >
        <div className="setImageBox">
            <Avatar style={{margin:'0 auto'}} alt={data.nick} src={`img/${path}`} className={classes.large}/>
            <div className="btn">
                <Button onChange={onImgChange} style={{marginBottom:'4px'}}>
                    <label htmlFor="profile_change_input">이미지 업로드</label>
                </Button>
                <div>
                    
                    <input onChange={onImgChange} id="profile_change_input" name="img" type="file" accept="image/*"/>
                </div>
                <Button className="deleteBtn" onClick={onDeleteImg}>이미지 제거</Button>
            </div>
        </div>
        <div className="basicInfo">
            닉네임<h2>{data.nick}</h2>
            이메일<h4>{data.email}</h4>
        </div>
        </Container>
    
    )
}

export default SetImage;