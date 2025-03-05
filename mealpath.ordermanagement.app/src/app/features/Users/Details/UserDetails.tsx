import React from "react";
import { Card, Button } from 'semantic-ui-react'; 
import { useStore } from "../../../stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";

export default function CategoryDetails(){
    const {userStore} = useStore();
    const { selectedUser: user, openForm, cancelSelectedUser } = userStore;

    if(!user) return <LoadingComponent />;

    return (
        <Card>
            <Card.Content>
                <Card.Header>{user.email}</Card.Header>
                <Card.Meta>Roles: {user.roles.join(', ')}</Card.Meta>
                <Card.Description>
                    this is the id of the user: {user.userId}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button onClick={() => openForm(user.userId)} basic color='blue'>
                    Edit
                </Button>
                <Button onClick={cancelSelectedUser} basic color='red'>
                    Cancel
                </Button>
                </div>
        </Card.Content>
      </Card>
    )
}