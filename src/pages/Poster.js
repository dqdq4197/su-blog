import React, {useEffect} from 'react';
import Header from '../components/header/Header';
import styled from 'styled-components';
import VariousBtn from '../components/poster/VariousBtn'
import {posterLoadRequest, posterLoadSuccess} from '../actions/posts';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
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






const PosterContainer= styled.div`
  .posterdiv {
    .col-md-8.blog-main {
      margin:0 auto;
      padding:50px;
      word-break:break-word;
      img {
        max-width:720px;
      }
    }
  }
`



const Poster = ({match}) => {

  const userInfo = storage.get('loginInfo');

  const dispatch = useDispatch();
  const {isLoadding} = useSelector(state => state.posts);

      const posterShowRquest = async() => {
        dispatch(posterLoadRequest());
        await axios.get(`/post/${match.params.id}/${match.params.author}`)
        .then((res) => {
          dispatch(posterLoadSuccess());
          if(res.data) {jsonData(res.data)};
        })
      }

      useEffect(() => {
        posterShowRquest();
      },[]);

      function replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
      }

      const jsonData = (json) => {
        var html = '';
        json.forEach(function(block) {
          
          switch (block.type) {
            case 'header':
              html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
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
              html += '<ul>';
              block.data.items.forEach(function(li) {
                html += `<li>${li}</li>`;
              });
              html += '</ul>';
              break;
            case 'embed':
              html += `<embed src="${block.data.embed}" width="${block.data.width}" height="${block.data.height}"><br /><em>${block.data.caption}</em>`
              break;
            case 'raw':
              //const a = replaceAll(block.data.html,"<","&lt")
              const highlightedCode = hljs.highlightAuto(block.data.html).value
              html += `<pre><code class="hljs" style="max-height:300px">${highlightedCode}</code></pre>`
              break;
            default:
              console.log('Unknown block type', block.type);
              console.log(block);
              break;
          }
          
          document.getElementById('content').innerHTML = html;
        });
      };

      

    return (
      <>
          <Header />
          <PosterContainer>
            <main role="main" className="posterdiv">
              <div className="row">
                <div className="col-md-8 blog-main">
                  <div className="blog-post">
                    <div id="content">
                      ..isLoadding                  
                    </div>
                  </div>
                  {isLoadding === 'SUCCESS' && (userInfo ? (userInfo.nick === match.params.author || userInfo.nick === ' Operator') : false )? <VariousBtn posterId={match.params.id} author={match.params.author}/> : ''}
                </div>
              </div>
            </main>
        </PosterContainer>
      </>
    )
}
export default Poster;