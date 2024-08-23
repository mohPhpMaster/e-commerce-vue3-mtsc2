import type {IUserNotification} from "@/types/user-notification-d-t";

export interface IUser {
    id: number
    name: string
    username: string
    email: string
    image?: string
    mobile: string
    points: number,
    token?: string,
    notifications?: IUserNotification[]
}