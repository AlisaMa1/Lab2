import { UserRole } from "./UserRole";

export interface UserList{
    userId: string,
    userName: string,
    email: string,
    roles: UserRole[]
}