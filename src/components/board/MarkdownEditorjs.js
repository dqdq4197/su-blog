import React, {useState} from 'react';
import styled from 'styled-components'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import RawTool from '@editorjs/raw';
import Quote from '@editorjs/quote';
//import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import InlineCode from '@editorjs/inline-code';
import './markdown.css';
import axios from 'axios';
import {useSelector } from 'react-redux';


const MarkdownContainer = styled.div`
   


`

const MarkdownEditorjs = () => {


  const user = useSelector(state => state.authentication.status.currentUser);
  const [userId, setUserId] = useState(user.user_id);

  const editor = new EditorJS({ 
    holderId: 'editorjs', 
    placeholder: '여기에 작성하세요!',
    tools: {
      image: SimpleImage,
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
      },
      checklist :{
        class: Checklist,
        inlineToolbar: true,
      },
      raw: RawTool,
      embed: {
        class: Embed,
        inlineToolbar:true,
        config: {
          services: {
            youtube: true,
            coub: true,
          }
        }
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O',
      },
      header: {
        class: Header, 
        inlineToolbar: ['link'], 
        config: {
          placeholder: "Enter a header"
        },
        type: {
          text: "hi",
          level:2,
        }
      }, 
      list: { 
        class: List, 
        inlineToolbar: true, 
      }  
  },
  onReady: () => {
    console.log('Editor.js is ready to work!')
 },
  onChange: () => {
    console.log('changed');
  }
})

const onClickSave = () => {
  editor.save().then((outputData) => {
    console.log(user.user_id,userId);
    axios.post('/post/upload',
    {
      outputData,
      userId    
    })
    .then((res) => {
      console.log(res.data);
    }).catch((error) => {console.log(error)})
    console.log('Article data: ', outputData)
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
}

  
  return (
    <MarkdownContainer className="markdown">
      <h1>MY CONTENT</h1>
      <div id="editorjs"></div>
      <button onClick={onClickSave}>save</button>
    </MarkdownContainer>
  )
}

export default MarkdownEditorjs;