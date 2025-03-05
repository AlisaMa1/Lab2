import React, { useState } from "react";
import { Segment, Button, Header, Checkbox } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Formik, Form,  } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../common/form/MyTextInput";
import { UserRole } from "../../../models/UserRole";
import MySelectInput from "../../../common/form/MySelectInput";
import { RoleOptions } from "../../../common/options/roleOptions";
import { UserRoles } from "../../../models/UserRoles";
import { toJS } from "mobx";

export default observer(function CategoryForm(){
    const {userStore} = useStore();
    const {selectedUser, selectedUserRoles, closeForm, manageUserRoles, loading} = userStore;
    
    const validationSchema = Yup.object({
    })

    
    const initialState = {
        userId: selectedUser.userId,
        email: selectedUser.email,
        userRoles: selectedUserRoles 
    }

    const [roles, setRoles] = useState(selectedUserRoles)
    const [user, setUser] = useState(initialState);

    function handleFormSubmit(user){
        //user.userId ? updateUser(user) : createUser(user);
        user.userRoles = toJS(roles);
        manageUserRoles(user)
    }

    const handleRoleChange = (id: string) => {
        setRoles((prevRoles) =>
        prevRoles.map((role) =>
            role.roleId === id ? { ...role, isSelected: !role.isSelected } : role
        )
        );
    }
    return (
        <Segment clearing>
            <Header content='User details' sub color='teal' />
            <Formik 
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={values => handleFormSubmit(values)} initialValues={user}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='userId' placeholder={user.userId} label="UserId" disabled={true} />
                    <MyTextInput name='email' placeholder={user.email} label='Email' disabled={true} />
                    {roles.map((role)=>(
                        <div key={role.roleId} className="ui checkbox m-1">
                            <Checkbox 
                                label={role.roleName} 
                                checked={role.isSelected}
                                onChange={() => handleRoleChange(role.roleId)} 
                            />
                        </div>
                    ))}
                    <Button 
                        disabled={isSubmitting || !isValid}
                        loading={loading} 
                        positive 
                        floated='right' 
                        type="submit" 
                        content='Submit' />
                    <Button onClick={closeForm} floated='right' type="button" content='Cancel' />
                </Form>
                )}
            </Formik>
        </Segment>
    )
})