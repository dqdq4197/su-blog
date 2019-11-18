import React from 'react'
import { List } from 'semantic-ui-react'

const Profile_edit = ({email, nick}) => (
    <List>
      <List.Item>
        <List.Icon name='users' />
        <List.Content>{nick}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='marker' />
        <List.Content>In South Korea</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='mail' />
        <List.Content>
          <a href='mailto:{email}'>{email}</a>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='linkify' />
        <List.Content>
          <a href='http://www.facebook.com'>facebook</a>
        </List.Content>
      </List.Item>
    </List>
)

export default Profile_edit