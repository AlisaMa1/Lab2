import React from "react";
import { Card, Button } from 'semantic-ui-react'; 
import { useStore } from "../../../stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function CategoryDetails(){
    const {categoryStore} = useStore();
    const { selectedCategory: category, openForm, cancelSelectedCategory } = categoryStore;

    if(!category) return <LoadingComponent />;

    return (
        <Card>
            <Card.Content>
                <Card.Header>{category.name}</Card.Header>
                <Card.Meta>this is a category</Card.Meta>
                <Card.Description>
                    this is the id of the category: {category.categoryId}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button onClick={() => openForm(category.categoryId)} basic color='blue'>
                    Edit
                </Button>
                <Button onClick={cancelSelectedCategory} basic color='red'>
                    Cancel
                </Button>
                </div>
        </Card.Content>
      </Card>
    )
})