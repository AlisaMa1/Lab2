import React from "react";
import { Category } from "../../../models/category";
import { Segment, List, Button } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

interface Props{
    categories: Category[];
}

export default function CategoryList({categories}: Props){
    const {categoryStore} = useStore();
    
    return (
        <Segment>
            <List celled>
            <h3>Category list</h3>
                {categories.map(category => (
                    <List.Item key={category.categoryId}>
                        <List.Content>
                            <List.Header>{category.name}</List.Header>
                            {category.categoryId}
                            <Button onClick={() => categoryStore.selectCategory(category.categoryId)} floated="right" content="View" color="blue" />
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Segment>
    )
}