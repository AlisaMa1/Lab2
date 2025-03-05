import { store, useStore } from '../../../stores/store'; // Assuming you have a root store
import { UserList } from '../../../models/userList';
import { Card, List, Segment, Image, Button } from 'semantic-ui-react';

interface Props{
    users: UserList[];
}

export default function UsersList({users}: Props){
    const {userStore} = useStore();

    return (
            <Segment>
                <List animated verticalAlign='middle' size='big'>
                <h2>Users list</h2>
            {users.map((user) => (
                <List.Item>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                    <List.Content>
                        <List.Header>{user.email}</List.Header>
                        <b>Roles</b>: {user.roles && user.roles.join(', ')}
                    </List.Content>
                        <Button onClick={() => userStore.selectUser(user.userId)} floated="right" content="View" color="blue" />
                </List.Item>
            ))}
        </List>
            </Segment>
    )
}