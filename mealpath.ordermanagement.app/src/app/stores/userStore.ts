import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { UserRole } from "../models/UserRole";
import { UserList } from "../models/userList";
import { Role } from "../models/Role";
import { UserRoles } from "../models/UserRoles";
import { toast } from "react-toastify";
export default class UserStore {
    user: User | null = null;
    userRoles: Role [] = []
    refreshTokenTimeout: any;
    usersList: UserList[]| null = null; 
    selectedUser: UserList|undefined = undefined;
    selectedUserRoles: UserRoles[] | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);            
            this.userRoles = this.getCurrentUserRoles(user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            window.location.href = '/';
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        window.location.href = '/';
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            this.userRoles = this.getCurrentUserRoles(user);
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    getAllUsersList = async () => {
        try{
            const users = await agent.Account.getAllUsers();
            var usersRes = [];
            users.map((user)=>{
                user = user['result']
                
                console.log(user)
                usersRes.push(user)
            })
            this.usersList = usersRes;
            this.setLoadingInitial(false);
        }catch(error){
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            var user = await agent.Account.register(creds);
            this.userRoles = this.getCurrentUserRoles(user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            window.location.href = '/';
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectUser = async (id: string) => {
        this.selectedUser = this.usersList.find(x => x.userId === id);
        var roles = await agent.Account.getUserRoles(id);
        runInAction(()=>{
            this.selectedUserRoles = toJS(roles);
        })
    }

    cancelSelectedUser = () => {
        this.selectedUser = undefined;
    } 

    openForm = (id?: string) => {
        id ? this.selectUser(id) : this.cancelSelectedUser();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    updateUser = async (userRole: UserRole) => {
        this.loading = true;
        try{
            await agent.Account.addUserToRole(userRole);
            var user = this.usersList.find(u => u.userId == userRole.userId);
            this.usersList = [...this.usersList.filter(c => c.userId !== userRole.userId), user];
            this.selectedUser = user;
            this.editMode = false;
            this.loading = false;
            this.getAllUsersList()
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    manageUserRoles = async (model) => {
        this.loading = true;
        try{
            await agent.Account.manageUserRoles(model.userId, model.userRoles)
            var user = this.usersList.find(u => u.userId == model.userId);
            this.usersList = [...this.usersList.filter(c => c.userId !== model.userId), user];
            this.selectedUser = user;
            this.editMode = false;
            this.loading = false;
            this.getAllUsersList()
            toast.success('Role changed successfully')
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    getCurrentUserRoles = (user: User) => {
        const decodedJwtData = this.decodeJwt(user);
        var roles = [];
        if(Array.isArray(decodedJwtData.role)){
            decodedJwtData.role.forEach(element => {
                roles.push(element)
            });
        }else{
            roles.push(decodedJwtData.role)
        }
        return roles;
    }

    decodeJwt = (user: User) => {
        let jwtData = user.token.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
            //console.log(decodedJwtData)
            //console.log(decodedJwtData.role)
        return decodedJwtData;
    }
}