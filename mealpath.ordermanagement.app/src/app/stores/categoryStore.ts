import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Category } from "../models/category";
import agent from "../api/agent";

export default class CategoryStore{
    categories: Category[] = [];
    categoryRegistry = new Map<string, Category>();
    selectedCategory: Category|undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this);
    }

    loadCategories = async () => {
        try{
            /*
            const categories = await agent.Categories.list();
            categories.forEach(category => {
                category.createdDate = category.createdDate.Split('T')[0];
                this.categoryRegistry.set(category.categoryId, category);
            })
            */
            this.setLoadingInitial(true)
            this.categories = await agent.Categories.list();
            this.setLoadingInitial(false);
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectCategory = (id: number) => {
        this.selectedCategory = this.categories.find(x => x.categoryId === id);
    }

    cancelSelectedCategory = () => {
        this.selectedCategory = undefined;
    } 

    openForm = (id?: number) => {
        id ? this.selectCategory(id) : this.cancelSelectedCategory();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createCategory = async (category: Category) =>{
        this.loading = true;
        try{
            var response = await agent.Categories.create(category);
            var createdCategory = response.data;
            // console.log(createdCategory['value'].categoryId)
            category.categoryId = createdCategory['value'].categoryId;
            //console.log('created categoru',createdCategory);
            runInAction(() => {
                this.categories.push(category);
                this.selectedCategory = category;
                this.editMode = false;
                this.loading = false;
                this.loadCategories();
            })
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateCategory = async (category: Category) => {
        this.loading = true;
        try{
            await agent.Categories.update(category);
            this.categories = [...this.categories.filter(c => c.categoryId !== category.categoryId), category];
            this.selectedCategory = category;
            this.editMode = false;
            this.loading = false;
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}