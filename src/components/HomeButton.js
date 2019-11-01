import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const btnStyle = {
  display : 'inline'
}
const HomeButton = () => (

  
  <div style={btnStyle}>
    <Button animated>
      <Button.Content visible>그냥 둘러보기..</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
  </div>
)

export default HomeButton
