import { Formik, Form, ErrorMessage } from "formik";
import React from "react";
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm(){
    const {userStore} = useStore();
    return(
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors({error: 'invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Log in to MealPath' color="teal" textAlign="center" />
                    <MyTextInput name="email" placeholder="email" />
                    <MyTextInput name="password" placeholder="password" type="password" />
                    <ErrorMessage 
                        name="error"
                        render={() => <Label basic color="red" style={{marginTop: '10px'}} content='invalid username or password' /> }
                    />
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />                    
                </Form>
            )}
        </Formik>
    )
})