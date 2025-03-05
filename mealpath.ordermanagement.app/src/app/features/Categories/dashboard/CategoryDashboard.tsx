import React, { useEffect } from "react";
import { Category } from "../../../models/category";
import { Grid, Menu, Button } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";
import CategoryDetails from "../details/CategoryDetails";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../layout/LoadingComponent";

interface Props{
    categories: Category[];
}

export default observer(function CategoryDashboard({categories}: Props){
    const {categoryStore} = useStore();
    const {selectedCategory, editMode } = categoryStore;

    
    useEffect(() => {
        categoryStore.loadCategories();
    }, [categoryStore])

    if(categoryStore.loadingInitial) return <LoadingComponent content="Loading app" />

    return(
        <Grid>
            <Grid.Row>
            <Menu.Item>
                    <Button onClick={() => categoryStore.openForm()} positive content="Create Category" />
                </Menu.Item>
            </Grid.Row>
            <Grid.Column width='10'>
                <CategoryList categories={categoryStore.categories} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCategory && !editMode &&
                <CategoryDetails />}
                {editMode && 
                    <CategoryForm />
                }
            </Grid.Column>
        </Grid>
    )
})