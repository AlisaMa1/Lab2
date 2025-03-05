import React, { useState } from "react";
import { Segment, Button, Header } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Formik, Form,  } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../common/form/MyTextInput";
import { Category } from "../../../models/category";

export default observer(function CategoryForm(){
    const {categoryStore} = useStore();
    const {selectedCategory, closeForm, createCategory, updateCategory, loading} = categoryStore;
    
    const initialState = selectedCategory ?? {
        categoryId: 0,
        name: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('The category name is required')
    })

    const [category, setCategory] = useState(initialState);

    function handleFormSubmit(category: Category){
        category.categoryId ? updateCategory(category) : createCategory(category);
    }

    return (
        <Segment clearing>
        <Header content='Category details' sub color='teal' />
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={category} 
        onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput name="name" placeholder="name" />
                <Button 
                    disabled={isSubmitting || !dirty || !isValid}
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