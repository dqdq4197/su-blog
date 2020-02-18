import React from 'react'
import { Icon, Image, Item } from 'semantic-ui-react'
import postTumnail from '../../lib/basicTumnail/postTumnail.png';


const PosterImage = ({data}) => {
    console.log(data)
    return (
  <Item.Group>
      {data ? data.map((block) => {
        return (
            <>
            <Item>
              <Item.Image size='medium' src={block.tumnailImg ? 'img/' + block.tumnailImg : postTumnail} />
              <Item.Content>
                <Item.Header as='a'>{block.tumnailTitle}</Item.Header>
                <Item.Description>Hooks 는 리액트 v16.8 에 새로 도입된 기능으로서, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState,<br/> 
                    그리고 렌더링 직후 작업을 설정하는 useEffect 등의 기능등을 ..</Item.Description>
                <Item.Extra>
                  <Icon color='green' name='check' /> 121 Votes
                </Item.Extra>
              </Item.Content>
            </Item> <hr/></>)
      }) : null}
  </Item.Group>
  )
}

export default PosterImage;