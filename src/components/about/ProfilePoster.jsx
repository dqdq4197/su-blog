import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

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
    img {
        width:330px;
        height:240px;
        text-align:center;
    }
`


const ProfilePoster = ({data}) => {
    return (
        <>
        
            {data.map((block) => {
                return <Link to={`/poster/${block.id}/${block.author}`}><TumnailBox >
                        <div className='posterInfo'>
                            <b>{block.tumnailTitle}</b>
            <p>{block.author}<text><Icon name="comment outline" />{block.comments.length}개의 댓글</text></p>
                            
                        </div>
                        <img src={`img/${block.tumnailImg}`} />
                        </TumnailBox>
            </Link>})}
        </>
    )
}

export default ProfilePoster;