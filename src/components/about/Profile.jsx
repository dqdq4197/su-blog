import React,{useEffect, useState, useCallback} from 'react';
import ProfileChange from './ProfileChange';
import {profile_img_change} from '../../actions/authentication';
import {useDispatch, useSelector} from 'react-redux';
import ProfileEdit from './ProfileEdit';
import ProfileFeed from './ProfileFeed';
import storage from '../../lib/storage';
import axios from 'axios';
import ProfilePoster from './ProfilePoster';
import './profile.css';
import styled from 'styled-components';
import {Button} from '../../lib/AuthInput';
import {Icon} from 'semantic-ui-react';
import {Link , useLocation, Switch, Route} from 'react-router-dom';
import TimeLine from './TimeLine';
import PosterImage from './PosterImage';




const ProfileContainer = styled.div`
    width:100%;
    background-color:#f9f9f9;
    height:94%;
    margin:0 auto;
    padding:0 0 0 60px;
    .profile_box {
        display:flex;
        height:100%;
        padding:20px 30px;
        .profile {
            display:block;
            text-align:center;
            .leftTop {
                background-color:white;
                width:360px;
                height:100%;
                padding: 25px 30px 16px;
                box-shadow: 0 0 3px rgba(0,0,0,.2);
                border-radius:5px;
                .profile_pic {
                    width:110px;
                    height:110px;
                    border-radius:110px;
                    margin:0 auto;
                    background:url(${props => props.img});
                    background-size:cover;
                    background-position:center center;
                }
                p {
                    text-align:center;
                    color:black;
                    margin-top:20px;
                    font-weight:400;
                    b {
                        font-size:1.5rem;
                    }
                }
                p.skillTitle {
                    font-size:1.5rem;
                    font-weight:500;
                }
                ul {
                    margin:0;
                    padding:0;
                }
                ul li {
                    display:inline-block;
                    width: auto;
                    background-color: transparent;
                    list-style:none;
                    border: 1px solid #E1E7EB;
                    border-radius: 5px;
                    margin: 0 0 3px 5px;
                    padding: 3px 8px;
                    color:#90A4AE;
                }
                .socialUtil {
                    font-size:1.8rem;
                }
                p.IntroTitle {
                    font-weight:600;
                    font-size:1.4rem;
                }
            }
        }
        .FeedBox {
            span {
                width:30px;
                margin-right:20px;
                font-size:1.2rem;
                font-weight:400;
                color:black;
            }
            width:100%;
            padding:20px 0 0 3%;
            background-color:transparent;
            margin-left:20px;
            border-radius:5px;
            height:auto;
            .basic {
                color:${props => props.pathCase ? 'black' : null}
            }
            .time {
                color:${props => props.pathCase ? null : 'black'}
            }
        }

    }

`
const Profile = ({profile,nick}) => {

    //const {status, result} = useSelector(state => state.authentication);
    //const dispatch = useDispatch();
    //
    //const [img_path, setImg_path] = useState('');
    //useEffect(() => {
    //    setImg_path(status.currentUser.profile_img_path)
    //},[status.currentUser.profile_img_path])

    // const onSubmitForm = async(e) => {
    //     e.preventDefault();
    //     await axios({
    //         url:'/auth/profile/save',
    //         method:'post',
    //         data:{
    //             img_path,
    //             id:status.currentUser.user_email
    //         }
    //     })
    //     .then((res) => {
    //         alert('프로필 정보를 저장하였습니다.')
    //         console.log(res.data);
    //         const loginInfo = storage.get('loginInfo');
    //         loginInfo.profile_img = res.data
    //         storage.set('loginInfo',loginInfo);
    //     })
    // }

    // const onImgChange = useCallback((e) => {
    //     e.preventDefault();
    //     const formdata = new FormData();
    //     formdata.append('img', e.target.files[0]);
    //     dispatch(profile_img_change(formdata))
    //     console.log(e.target.files[0]);
    // },[]);





    const [info, setInfo] = useState(null);
    const [activeTap, setActiveTap] = useState(true);
    const location = useLocation();
    useEffect(() => {
        getData();
        if(location.pathname.indexOf('/timeline') > -1) {
            setActiveTap(false);
        }
    },[])
    const getData = () => {
        axios.get(`/about/${nick}`).then((res) => {
            setInfo(res.data);
        })
    }
    return (
        <>
            {info ? <>
            <ProfileContainer img={'img/'+info.profile_img} pathCase={activeTap}>
                <div className="profile_box">
                    <div className="profile">
                        <div className="leftTop">
                            <div className="profile_pic" />
                            <p>
                                <b>{nick.substr(1,nick.length+1)}</b><br/>
                                Web Designer<br/>
                                {info.email}<br/>
                                +82 1041973142
                
                            </p>
                            <Button>메일보내기</Button>
                            <hr/>
                            <p className="skillTitle">skills</p>
                            <ul>
                                <li>Nodejs</li>
                                <li>React</li>
                                <li>Html</li>
                                <li>Css</li>
                                <li>Javascript</li>
                                <li>Mysql</li>
                                <li>Mssql</li>
                                <li>Jsp</li>
                                <li>Ui</li>
                                <li>Ux</li>
                            </ul>
                            <hr/>
                            <div className="socialUtil">
                                <p className="skillTitle">Social</p>
                                <Icon name="facebook"></Icon>
                                <Icon name="github"></Icon>
                                <Icon name="instagram"></Icon>
                                <Icon name="blogger"></Icon>
                            </div>
                            <hr/>
                            <div className="myIntro">
                                <p className="IntroTitle">나의 소개</p>
                                안녕하세요. 웹 개발을 좋아하고 디자인을 싫어하는
                                개발자를 꿈꾸는 heesu 입니다.<br/>
                                블로그 다시 다 뜯어 고치고싶습니다.<br/>
                                감사합니다.
                                
                            </div>
                        </div>
                    </div>
                
                <div className="FeedBox">
                    <div className="util"> 
                        <Link to={`/about/@${info.nick}`}><span className="basic">글</span></Link>
                        <Link to={`@${info.nick}/timeline`}><span className="time">타임라인</span></Link>
                    </div>
                    <hr/>
                    <Switch>
                    <Route path="/about/:nick" exact>
                        <ProfilePoster data={info.posters} />
                    </Route>
                    <Route path="/about/:nick/timeline">
                        <PosterImage data={info.posters}/>
                    </Route>
                    </Switch>
                </div>
                    
                </div>
            </ProfileContainer> 
            </> : null}
            
            {/* <form onSubmit={onSubmitForm}>
                <ProfileChange onImgChange={onImgChange} path={status.currentUser.profile_img_path ? status.currentUser.profile_img_path :  result.profile_img}/>
                <ProfileEdit email={email} nick={nick}/>
                <button className="formbtn">저장</button>
            </form>    */}
        </>
    )
}

export default Profile;