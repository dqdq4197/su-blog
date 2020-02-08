import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams, useLocation} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import styled from 'styled-components'; 
import axios from 'axios';
import VariousBtn from '../components/poster/VariousBtn';
import {posterLoadRequest, posterLoadSuccess} from '../actions/posts';
import ContentBox from '../components/poster/Comments';
import storage from '../lib/storage';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml'; 
import css from 'highlight.js/lib/languages/css'; 
import json from 'highlight.js/lib/languages/json'; 
import java from 'highlight.js/lib/languages/java'; 
import python from 'highlight.js/lib/languages/python'; 
import typescript from 'highlight.js/lib/languages/typescript'; 
import 'highlight.js/styles/atom-one-dark-reasonable.css';
hljs.registerLanguage('html', html); 
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);

const ModalContainer = styled.div`
    position: fixed;
    z-index: 100000;scrollbor-color:white;
    overflow: auto;
    top: 0;
    background: rgba(0,0,0,.8);
    width: 100%;
    left:0;
    bottom:0;
    right:0;
    .modalBox {
        
        position:absolute;
        top:60px;
        border-radius:10px;
        left:15%;
        right:15%;
        z-index:100000000;
        color:black;
        background-color:white;
    }
`

const SubTitleBox = styled.div`
  position:fixed;
  z-index:100;
  top:200px;
  right:0;
  width:17%;
    ul {
      .commentView {
        margin-top:20px;
        font-weight:700;
      }
      li {
        margin-bottom:3px;
        a {
          &:hover {
            color:#008000;
          }
          color:white;
          text-decoration:none;
        }
        list-style:none;
        font-size:.95rem;
      }
  }
  
 
`

const PosterContainer= styled.div`

  .posterdiv {
    .col-md-8.blog-main {
      background-coloR:#fafbfc;
      margin:100px auto 0;
      word-break:break-word;
      img {
        max-width:100%;
      }
    }
  }
`

const ScrollupBtn = styled.div`
  position:fixed;
  width:50px;
  height:50px;
  border-radius:50px;
  border:2px solid #e9e7e7;
  left:83%
  bottom:120px;
  font-size:3em;
  color:#6c757d;
  transition:.3s;
  &:hover {
    color:rgba(13,72,50,.8);
    border-color:rgba(13,72,50,.5);
  }
  i {
    left: -3%;
    position: relative;
    top: -23%;
  }
`
const ScrolldownBtn = styled.div`
  position:fixed;
  width:50px;
  height:50px;
  border-radius:50px;
  border:2px solid #e9e7e7;
  left:83%
  bottom: 50px;
  font-size:3em;
  color:#6c757d;
  transition:.3s;
  &:hover {
    color:rgba(13,72,50,.8);
    border-color:rgba(13,72,50,.5);
  }
  i {
    left: -3%;
    position: relative;
    top: -20%;
  }
`

const PosterModal = () => {

    const history = useHistory();
    const { id,author } = useParams();
    const location = useLocation();
    const userInfo = storage.get('loginInfo');
    const dispatch = useDispatch();
    const {isLoadding} = useSelector(state => state.posts);

    const [comments, setComments] = useState({});
    const [modifyData, setModifyData] = useState({});
    const [header, setHeader] = useState([{id:'',text:''}]);


    useEffect(() => {
        document.getElementById('body').style.overflow='hidden';
        getData();
        return () => {document.getElementById('body').style.overflow='visible';}
    },[])

    const getData = async() => {
        const outData = location.state.block.content.blocks.map((result)=>{
            return result;
          })
          setModifyData(location.state.block);
          jsonData(outData);
        await axios.get(`/comment/${id}`).then((res) =>{
            let array=[]; 
            let array1=[];
  
            res.data.map((dap) => {!dap.parent && array.push(dap)});
            array1=res.data.filter(dap1 => dap1.parent !== null ).reverse();
            array1.map(dap2 => {
              array.map((dap3,i) => dap2.parent === dap3.id ? array.splice(i+1,0,dap2) : null)})
            setComments(array);
          })
    };
    const scrollup = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      const scrolldown = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }

      const jsonData = (json) => {
        var html = '';
        json.forEach(function(block,i) {
          
          switch (block.type) {
            case 'header':
              html += `<h${block.data.level} id='${i+'_'+block.data.text}'>${block.data.text}</h${block.data.level}>`;
              setHeader((prev) => [...prev,{id:i+'_'+block.data.text,text:block.data.text}])
              break;
            case 'paragraph':
              html += `<p>${block.data.text}</p>`;
              break;
            case 'delimiter':
              html += '<hr />';
              break;
            case 'image':
              html += `<img className="img-fluid" src="${block.data.file.url}" alt="" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
              break;
            case 'list':
              if(block.data.style==='ordered') {
                html += '<ol>';
                block.data.items.forEach(function(li) {
                  html += `<li>${li}</li>`;
              })
              html += '</ol>';
            }else{ 
                html += '<ul>';
                block.data.items.forEach(function(li) {
                  html += `<li>${li}</li>`;
                });
                html += '</ul>';
              }
              
              break;
            case 'embed':
              html += `<embed src="${block.data.embed}" width="${block.data.width}" height="${block.data.height}"><br /><em>${block.data.caption}</em>`
              break;
            case 'raw':
              const highlightedCode = hljs.highlightAuto(block.data.html).value
              html += `<pre><code class="hljs" style="max-height:700px">${highlightedCode}</code></pre>`
              break;

            default:
              console.log('Unknown block type', block.type);
              console.log(block);
              break;
          }
          
          document.getElementById('content').innerHTML = html;
        });
      };

      const SubTitle = () => {
        return header ? <SubTitleBox>{<ul>{header.map(
            (title) => {
               return (<li key={title.id}><a href={'#'+title.id}>{title.text}</a></li>)
            }
        )}<li className="commentView"><a href="#commentView">댓글 보기</a></li></ul>}</SubTitleBox> : null
      }
    const back = e => {
        e.stopPropagation();
        if (e.target !== e.currentTarget){
             return ; 
        }else {
             history.goBack();
        }
        
        
      };

    return (
        <>
        <ModalContainer onClick={back} >
            <div className="modalBox">
            <SubTitle />
            <ScrollupBtn height={window.innerHeight} onClick={scrollup}><Icon name="angle up"/></ScrollupBtn>
          <ScrolldownBtn height={window.innerHeight} onClick={scrolldown}><Icon name="angle down"/></ScrolldownBtn>
            <PosterContainer id='total'>
            <main role="main" className="posterdiv">
              <div className="row">
                <div className="col-md-8 blog-main">
                  <div className="blog-post">
                    <div id="content">
                      ..isLoadding                  
                    </div>
                  </div>
                  {(userInfo ? (userInfo.nick === author || userInfo.nick === ' Operator') : false ) ? 
                    <VariousBtn data={modifyData} posterId={id} author={author}/> : ''}
                  <ContentBox data={comments} postId={id}/>
                </div>
              </div>
            </main>
        </PosterContainer>
            </div>
        </ModalContainer>
        </>
    )
}

export default PosterModal;