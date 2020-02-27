import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import postTumnail from '../../lib/basicTumnail/postTumnail.png';
import Img from 'react-image';
import ImageLoad from '../../lib/skeleton/Home/ImageLoad';

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
    }
    }
    .posterInfo {
        position:absolute;
        display:flex;
        padding: 0 8px 8px;
        bottom:0;
        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(2,0,36,0.5489905434830182) 100%);
        width:100%;
        height:60px;
        color:white;
        opacity:0;
        transition:.3s;
        text-shadow: 1px 1px 3px rgba(0,0,0,.5);
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        box-sizing: border-box;
        .left {
            box-flex:1;
            flex:1;
            margin-right:14px;
            font-weight:300;
            p {
                font-size:11px;
            }
        }
        .right {
            display:flex;
            div {
                display:flex;
            }
        }
        b {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight:600;
            font-size:14px;
        }
        p {
            position:relative;
            font-size:14px;
            text-shadow: 1px 1px 3px rgba(0,0,0,.5);
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
    
console.log(data)
    return (
        <>
        
            {data.map((block) => {
                return <TumnailBox key={block.id}>
                        <Link to={`/poster/${block.id}/${block.author}`}>
                        <div className='posterInfo'>
                            <div className="left">
                                <b>{block.tumnailTitle}</b>
                                <p>{block.author}</p>
                            </div>
                            <div className='right'>
                                <div style={{marginRight:'7px'}}>
                                    <Icon name="heart outline" />
                                    3
                                </div>
                                <div>
                                    <Icon name="comment outline" />
                                    <p>{block.comments.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tumnailImg">
                            <Img 
                                src={block.tumnailImg ? `img/${block.tumnailImg}` : postTumnail}
                                loader={<ImageLoad />}
                             />
                        </div>
                        </Link>
                        </TumnailBox>
            })}
        </>
    )
}

export default ProfilePoster;