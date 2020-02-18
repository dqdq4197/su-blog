import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import postTumnail from '../../lib/basicTumnail/postTumnail.png';

const TumnailBox = styled.div`
    position:relative;
    display:inline-block;
    width:330px;
    height:240px;
    margin:0 20px 20px 0;
    border-radius:5px;
    overflow:hidden;
    cursor:pointer;
    &:hover {
        .posterInfo {
            opacity:1;
            bottom:0;
    }
    }
    .posterInfo {
        position:absolute;
        padding:0 0 0 10%;
        bottom:0;
        background: rgb(255,255,255);
        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(2,0,36,0.5489905434830182) 100%);
        width:100%;
        height:60px;
        bottom:-60px;
        color:white;
        font-size:1.3rem
        opacity:0;
        transition:.3s;
        text-shadow: 1px 1px 3px rgba(0,0,0,.5);
        p {
            position:relative;
            font-size:0.9rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,.5);
            text {
                position:absolute;
                color:white;
                right:20px;
            }
        }

    }
    .tumnailImg {
        display:flex;
        align-items:center;
        justify-content:center;
        width:330px;
        height:240px;
        overflow:hidden;

        img {
            height:240px;
            margin:0 auto;
        }
    } 
`


const ProfilePoster = ({data}) => {
    return (
        <>
        
            {data.map((block) => {
                return <TumnailBox key={block.id}>
                        <Link to={`/poster/${block.id}/${block.author}`}>
                        <div className='posterInfo'>
                            <b>{block.tumnailTitle}</b>
            <p>{block.author}<Icon name="comment outline" />{block.comments.length}개의 댓글</p>
                            
                        </div>
                        <div className="tumnailImg">
                            <img src={block.tumnailImg ? `img/${block.tumnailImg}` : postTumnail} />
                        </div>
                        </Link>
                        </TumnailBox>
            })}
        </>
    )
}

export default ProfilePoster;