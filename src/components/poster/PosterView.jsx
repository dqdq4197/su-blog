import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import './posterView.css';

const PosterView = ({id}) => (
  <Modal trigger={<Button>Long Modal</Button>}>
   
        {/* <iframe style={{display:'block',height:'100vh', width:'100%'}} src={`/poster/${id}/null`}></iframe> */}
  </Modal>
)

export default PosterView