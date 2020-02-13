import React, {useState, useRef} from 'react';
import { Button, Image, Modal, Icon, Dropdown} from 'semantic-ui-react';
import './modal.css';
import styled from 'styled-components';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


const TagsBox = styled.div`
position:absolute;
border-radius:100px;
border:1px solid rgba(0,0,0,.8);
height:30px;
width:150px;
bottom:30%;
#tagBox {
  border:none;
  width:80px;
  margin-left:12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:focus {
    outline:none;
  }
}

.plusBtn {
  position:absolute;
  right:5px;
  background-color:transparent;
  top:50%;
    transform: translateY(-50%);
  &:before{
    position:absolute
    left: 0px;
    top: -50%;
    transform: translateY(25%);
    cursor:pointer;
  }
}

`

const TagKeyBox = styled.div`
  position:absolute;
  display:inline;
  margin-top:30px;
  top:60%;
  .tagKey {
    position:relative;
    width:70px;
    font-size:.88rem;
    height:23px;
    margin:13px 0 0 5px;
    bottom:0;
    padding:0 6px;
    border-radius:20px;
    background-color: rgba(241, 237, 237, .3);
    border:1px solid rgba(0,0,0,.3);
    display: inline-block;
    &:before { margin-left:5px;}
  }
  .deleteIcon {
    position:absolute;
    right : 0px;
    display:inline;

  }
`
const UploadBtn = styled.div`
  position: relative;
  text-align:center;
  left: 21px;
  bottom:5%
  border-radius: 15px;
  background-color: transparent;
  border: 1px solid rgba(0,0,0,.8);
  width: 75px;
  height: 22px;
  font-size: .9rem;
  &:hover {
    border:1px solid rgba(94, 38, 224, 0.671);
    color:rgba(94, 38, 224, 0.671);
    .picture{
      color:black;
    }
  }
  #upFile {
    display:none;
  }
  label {
    height: 22px;
    width: 75px;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    padding-top:5%;
    cursor:pointer;
  }
`

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'graphic design', text: 'Graphic Design', value: 'graphic design' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'nodejs', text: 'NodeJS', value: 'nodejs' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'ui design', text: 'UI Design', value: 'ui design' },
  { key: 'user experience', text: 'User Experience', value: 'user experience' },
  { key: 'vue', text: 'Vue', value: 'vue' },
  { key: 'jquery', text: 'Jquery', value: 'jquery' },
];

const PosterModal = ({onClick, posterId, modifydata}) => {

  const {result} = useSelector(state => state.authentication);
  const {posterOutputData} = useSelector(state => state.posts)
  const [open,setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(null);
  const [tags, setTags] = useState([]);
  const [imgUrl, setImgUrl] = useState('https://cdn.pixabay.com/photo/2019/11/23/11/26/steel-mill-4646843__480.jpg');
  const [tumnailPosterInfo, setTumnailPosterInfo] = useState(
      [{
        title: '',
        imgUrl:'https://cdn.pixabay.com/photo/2019/11/23/11/26/steel-mill-4646843__480.jpg',
        tags:'',
        skills:'',
      }]
  )
  const history = useHistory();
  const tagnames= useRef();
  const titleRef = useRef();
  const show = (dimmer) => () => {
    onClick();
    setDimmer(dimmer);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };
  const onChangeTitle = (event) => {
    setTumnailPosterInfo(state => ({...state, title:titleRef.current.value}));
  }

  const onEnter = async(event) =>{
    if(event.keyCode === 13) {
      if(tagnames.current.value === '') return ;
      await Promise.resolve().then(() => {
        setTags((prevState) => [...prevState, tagnames.current.value])
      })
      setTumnailPosterInfo(state=> ({...state, tags:[...tags,tagnames.current.value]}))
      setTimeout(function() { tagnames.current.value=''; tagnames.current.focus()},0);
    }else {
        return ;
    }
  };

  const onDeleteTag = (key) => {
    const del = tags.filter((v,i) => i!==key ) 
    setTags(del);
    setTumnailPosterInfo(state=> ({...state, tags:[...tags,tagnames.current.value]}))
      console.log(tumnailPosterInfo);
  };

  const getSKills = (event,{value}) => {
    setTumnailPosterInfo(state=> ({...state, skills: value.join(',')}));
}

  const onTumnail = async(e) => {
    const formdata = new FormData();
    formdata.append('poster', e.target.files[0]);
    console.log(e.target.files[0]);
    await axios.post('/postting/tumnail/', formdata)
    .then((res) => {
      console.log(res.data);
      setImgUrl(res.data);
      setTumnailPosterInfo(state=> ({...state, imgUrl: res.data}));
      console.log(tumnailPosterInfo);
    }).catch((err) => {
      console.log(err.res);
    })
  }; 
  const onClickSave = () => {
    const userId= result.id;
    const nick = result.nick;
    console.log(posterOutputData)
    console.log(tumnailPosterInfo);
    if(posterId) {
      axios.post(`/post/modify/${posterId}`,
        {
          outputData:posterOutputData,
          userId,       
          nick,
          tumnailTitle:tumnailPosterInfo.title,
          hashTags: tumnailPosterInfo.tags.join(','),
          tumnailImg: tumnailPosterInfo.imgUrl,
          skills:tumnailPosterInfo.skills,
        }).then((res) => {
          alert('수정 완료');
          history.push(`/poster/${posterId}/${nick}`)
        }).catch((error) => {
          console.log(error.response)
        })
    }else {
      axios.post('/post/upload',
        {
          outputData:posterOutputData,
          userId,       
          nick,
          tumnailTitle:tumnailPosterInfo.title,
          hashTags: tumnailPosterInfo.tags.join(','),
          tumnailImg: tumnailPosterInfo.imgUrl,
          skills:tumnailPosterInfo.skills,
        })
        .then((res) => {
          alert('저장 완료');
          history.push(`/poster/${res.data.postId}/${res.data.nick}`)
          console.log(res.data);
        }).catch((error) => {
          console.log(error.response)
        });
    }
  }
  
    return (
      <>
        <Button onClick={show("blurring")}>저장하기</Button>
        <Button>임시저장</Button>
        <Modal dimmer={dimmer} open={open} onClose={close}>
          <Modal.Header>Select a Thumnail</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='medium'
              src={'img/'+imgUrl}
            />
            <Modal.Description>
              <input type="text" id="editTitle" placeholder="  Enter Title" ref={titleRef} onChange={onChangeTitle}/>
              <Dropdown placeholder='Skills' fluid multiple selection scrolling onChange={getSKills} options={options} />
              <div>
                <TagsBox>
                  <Icon className="tag_icon" name='tags' />
                  <input id="tagBox" type="text" ref={tagnames} onKeyDown={e => onEnter(e)} placeholder=" Enter tags" ></input>
                  <Icon className="plusBtn" name="plus circle"></Icon>
                </TagsBox>
                <TagKeyBox >{tags.map(
                              (value,i) => 
                                <div key={i} className="tagKey">
                                  <Icon name="tag" />{value}
                                  <div className="deleteIcon" onClick={() => onDeleteTag(i)} ><Icon name="cancel"/></div>
                                </div>
                            )}
                </TagKeyBox>
              </div>
            </Modal.Description>
          </Modal.Content>
          <UploadBtn>
              <label htmlFor="upFile">Upload</label>
              <input type="file" onChange={onTumnail} name="poster" id="upFile" accept="image/*"></input>
          </UploadBtn>
          <Modal.Actions>
            
            <Button color='black' onClick={close}>
              취소
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="저장"
              onClick={onClickSave}
              className="saveBtn"
            />
          </Modal.Actions>
        </Modal>
        </>
    )
}

export default PosterModal;