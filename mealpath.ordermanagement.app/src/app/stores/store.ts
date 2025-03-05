import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import { ModalStore } from "./modalStore";
import { Modal } from "semantic-ui-react";
import CartStore from "./cartStore";

interface Store{
    categoryStore: CategoryStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    cartStore: CartStore;
}

export const store: Store ={
    categoryStore: new CategoryStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    cartStore: new CartStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}