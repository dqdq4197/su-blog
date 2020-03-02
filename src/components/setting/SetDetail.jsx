import React,{useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Input} from '../../lib/AuthInput';
import axios from 'axios';
import storage from '../../lib/storage';

const TagKeyBox = styled.div`
  display:block;
  .tagKey {
    position:relative;
    cursor:pointer;
    width:auto;
    font-size:.88rem;
    margin:2px 0 0 5px;
    padding:5px 10px;
    font-weight:500;
    border-radius:10px;
    background-color: rgba(13,72,50,.08);
    display:inline-block;
  }
  }
`
const DetailBox = styled.div`
    margin-top:50px;
    padding:20px;
    h5 {
        display:flex;
        height:40px;
        align-items:center;
        flex:1;
        margin:0;
    }
    .showSkill {
        .sdiv {
            flex:8;
            color:#008000;
        }
        button {
            flex:1;
            border:none;
            background-color:transparent;
        }
        width:400px;
        display:flex;
        align-items:center;
        color:#90A4AE;
        flex:8;
        margin-left:50px;
    }
    .petchSkill {
        flex:8
        width:400px;
        margin-left:50px;
        .display {
            button {
                flex:1;
                border:none;
                background-color:transparent;
            }
            display: flex;
            justify-content: space-between;
            .skillInput {
                flex:9;
                width:150px;
                margin:0;
                padding:8px;
                &:focus {
                    outline:none;
                }
            }
        }
    }
    `

const SetDetail = ({data}) => {

    

    const [skill, setSkill] = useState(data.skills.split(','));
    const [isSetSkill, setIsSetSkill] = useState(false);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        axios.get(`/setting/${data.nick}`);
    }
    console.log(skill)
    const skillname= useRef();
    const onEnter = async(event) =>{
        if(event.keyCode === 13) {
          if(skillname.current.value === '' || (skill.indexOf(skillname.current.value) !== -1) ) { return skillname.current.value='';}
          console.log(skill, skillname.current.value)
          await Promise.resolve().then(() => {
            setSkill((prevState) => [...prevState, skillname.current.value])
          })
          setTimeout(function() { skillname.current.value=''; skillname.current.focus()},0);
        }else {
            return ;
        }
    };

    const onDeleteSkill = (key) => {
      const del = skill.filter((v,i) => i!==key ) 
      setSkill(del);
    };
    const onSaveSkill = () => {
        axios.patch(`/setting/${data.nick}`, {
            skill
        }).then(() => {
            let info = storage.get('loginInfo');
            info.skills = skill.join(',')
            storage.set('loginInfo',info);
            setIsSetSkill(false);
            console.log('했는데?');
        })
    }
    return (
        <DetailBox>
            <div style={{display:'flex'}}>
                <h5>기술 스택</h5>
                {isSetSkill ? null : <div className="showSkill">
                    <div className="sdiv"><TagKeyBox>
                        {skill.length === 0  ? '기술 스택을 추가해보세요!' : skill.map((value) => <div className="tagKey" key={value}>{value}</div>)}
                        </TagKeyBox></div>
                    <button onClick={()=> setIsSetSkill(true)} >수정</button>
                </div>}
                {isSetSkill ? <div className="petchSkill">
                    <div className="display">
                        <Input className="skillInput" name={'기술 스택 입력'} ref={skillname} onKeyDown={e => onEnter(e)} type='text'/>
                        <button onClick={onSaveSkill}>저장</button>
                    </div>
                    <TagKeyBox >{skill.map(
                              (value,i) => 
                                <div key={i} className="tagKey" onClick={() => onDeleteSkill(i)}>
                                  {value}
                                </div>
                            )}
                    </TagKeyBox>
                </div> : null}
            </div>
        </DetailBox>

    )
}

export default SetDetail;