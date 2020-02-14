import React, {useState, useEffect} from 'react';
import {Icon} from 'semantic-ui-react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Tag = styled.div`
    height:250px;
    border:1px solid #008000;
    width:100%;
    border-radius:5px;
    overflow:hidden;
    ul {
        margin:0;
        padding:0;
        li {
            list-style:none;
            a {
                background-color:black;
                color:white;
            }
        }
    }
`

const HashTags = ({data}) => {
    const [change, setChange] = useState(false);

    useEffect(() => {
        GetPriTags()
    },[change])

    const onRefresh = () => {
        setChange(!change);
    } 

    const GetPriTags = () =>{
        const priTags =data.filter((value, index) => {return data.indexOf(value) === index})
        const NaNsu = Math.floor(Math.random() * 10) +1 ;
        return <Tag><ul>{priTags.slice(NaNsu, NaNsu+5).map(a => <li key={a}><Link to='/home'>{a}</Link></li>)}</ul></Tag>
    }

    return (
        <>  
            <Icon name="refresh" onClick={onRefresh}></Icon>      
            <GetPriTags />
        </>
    )
}
// 리셋 버튼 누르면 useEffect 되게 useState만들고 GetPriTags에서 난수로 랜덤돌려 화면에 뿌려주자
export default HashTags;