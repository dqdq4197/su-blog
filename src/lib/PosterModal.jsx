import React, {useState, useRef} from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import './modal.css';
import styled from 'styled-components';
import axios from 'axios';


const TagsBox = styled.div`
position:absolute;
border-radius:100px;
border:1px solid rgba(0,0,0,.8);
height:30px;
width:150px;

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
  .tagKey {
    width:70px;
    font-size:.88rem;
    height:23px;
    margin:13px 0 0 5px;
    top:50%;
    transform:translateY(-50%);
    padding:0 6px;
    border-radius:20px;
    background-color: rgba(241, 237, 237, .3);
    border:1px solid rgba(0,0,0,.3);
    display: inline-block;
    &:before { margin-left:5px;}
  }
`
const UploadBtn = styled.div`
  text-align:center;
  left: 21px;
  position: relative;
  bottom: 15px;
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
const PosterModal = ({onClick}) => {

  
  const [open,setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(null);
  const [tags, setTags] = useState([]);
  const [imgUrl, setImgUrl] = useState('https://cdn.pixabay.com/photo/2019/11/23/11/26/steel-mill-4646843__480.jpg');
  const tagnames= useRef();



  const show = (dimmer) => () => {
    setDimmer(dimmer);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const onEnter = (event) =>{
    if(event.keyCode === 13) {
      setTags((prevState) => [...prevState, tagnames.current.value])
      setTimeout(function() {tagnames.current.value=''; tagnames.current.focus()},0);
    }else {
        return ;
    }
  };

  const onDeleteTag = (key) => {
    const del = tags.filter((v,i) => i!==key ) 
    setTags(del);
  };

  const onTumnail = async(e) => {
    const formdata = new FormData();
    formdata.append('poster', e.target.files[0]);
    console.log(e.target.files[0]);
    await axios.post('/postting/tumnail/', formdata)
    .then((res) => {
      console.log(res.data);
      setImgUrl(res.data);
    }).catch((err) => {
      console.log(err.res);
    })

  };
    return (
      <>
        <Button onClick={show("blurring")}>저장하기</Button>
        <Button onClick={onClick}>임시저장</Button>

        <Modal dimmer={dimmer} open={open} onClose={close}>
          <Modal.Header>Select a Thumnail</Modal.Header>
          <Modal.Content image>
          
            <Image
              wrapped
              size='medium'
              src={imgUrl}
            />
            
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <TagsBox>
                <Icon className="tag_icon" name='tags' />
                <input id="tagBox" type="text" ref={tagnames} onKeyDown={e => onEnter(e)} placeholder=" Enter tags" ></input>
                <Icon className="plusBtn" name="plus circle"></Icon>
              </TagsBox>
              <TagKeyBox >{tags.map(
                            (value,i) => 
                              <div key={i} className="tagKey">
                                <Icon name="tag" />{value}
                                <div onClick={() => onDeleteTag(i)} ><Icon name="cancel"/></div>
                              </div>
                          )}</TagKeyBox>
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
              onClick={close}
            />
          </Modal.Actions>
        </Modal>
        </>
    )
}

export default PosterModal;