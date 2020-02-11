import React,{useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';


const FeedBox = styled.div`
    position:relative;
    margin:0 auto 1px;
    text-align:left;
    width:50%;
    padding:10px;
    color:black;
    
    .poster_title {
        font-size:1.8rem;
        font-weight:600;
        margin-left:1%;
        cursor:pointer;
    }
    .poster_preview {
        display:flex;
        .poster_tumnail {
            width:230px;
            margin-right:2%;
            img {
                width:100%;
            }
        }
        .poster_content {
            flex:3;
            p {
                display: -webkit-box; display: -webkit-box; display: -ms-flexbox;
                max-height:100px; 
                overflow:hidden; 
                vertical-align:top; 
                text-overflow: ellipsis; 
                word-break:break-all;
                 -webkit-box-orient:vertical; 
                 -webkit-line-clamp:5;
                font-weight:500;

            }
        }
        }
    }
    
`
const ProfileFeed = ({data}) => {

    const history = useHistory();


    console.log(data)
    return (
        <>
        {data  ? data.map((info) => {
            return( <>
            <FeedBox  key={info.id} url={info.tumnailImg} img={info.user.profile_img}>
            <hr/>
                <div className='poster_title' onClick={()=>{history.push(`/poster/${info.id}/${null}`)}}>{info.tumnailTitle}</div>
                <div className='poster_preview'>
                    {info.tumnailImg ? <div className="poster_tumnail"><img src={'img/'+info.tumnailImg} /></div> : null}
                    <div className='poster_content'>
                    <p>{ info.content.blocks.map((block) => {
                            switch (block.type) {
                                case 'header': case 'paragraph':
                                    return ( <>{block.data.text.replace(/&nbsp;|<b>|<br>|<i>|<\/i>|<\/b>/g,'').replace(/&gt;/g,'<').replace(/&lt;/g,'>')} <br/></> )
                                case 'list' :
                                    return (<>{block.data.items.map(item =>
                                            item.replace(/&nbsp;|<b>|<br>|<i>|<\/i>|<\/b>/g,'').replace(/&gt;/g,'<').replace(/&lt;/g,'>'))
                                         }<br/></>);
                                default :
                                    return false;
                            };
                             
                        })}
                        </p>
                        <Icon name='comment outline'/>{info.comments.length}개의 댓글
                    </div>
                </div>
            </FeedBox>
            </>)
        }): null}
        </>
    )
}

export default ProfileFeed;