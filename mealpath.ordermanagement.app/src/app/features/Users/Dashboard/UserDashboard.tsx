import React, { useEffect } from 'react';
import { UserList } from "../../../models/userList";
import { useStore } from '../../../stores/store';
import { Button, Grid, List, Menu } from 'semantic-ui-react';
import UsersList from './UsersList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../layout/LoadingComponent';
import UserDetails from '../Details/UserDetails';
import UserForm from '../form/UserForm';

interface Props{
    users: UserList[];
}

export default observer(function UserDashboard({users}: Props){
    const {userStore} = useStore();
    const {selectedUser, editMode } = userStore;

    useEffect(() => {
        userStore.getAllUsersList();
    }, [userStore])

    if(userStore.loadingInitial) return <LoadingComponent content="Loading app" />

    return(
        <Grid>
            <Grid.Column width='10'>
                <UsersList users={userStore.usersList} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedUser && !editMode &&
                <UserDetails />}
                {editMode && 
                    <UserForm />
                }
            </Grid.Column>
        </Grid>
    )
})