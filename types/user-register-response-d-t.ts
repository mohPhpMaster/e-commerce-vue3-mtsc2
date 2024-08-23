import type {IUserNotification} from "@/types/user-notification-d-t";
import type {IUser} from "@/types/user-d-t";

export interface IUserRegisterResponse extends IUser {
    // id: number
    // name: string;
    // username: string;
    // email?: string;
    // image?: string
    // mobile: string
    // points: number,
    // token?: string,
    // notifications?: IUserNotification[]
}