
export interface User {
    email: string;
    pwd: string;
}

export enum STATUS {
    EXIST,
    INVALID,
    LOGGEDIN,
    SUCCESS,
}

export interface Log extends User {
    result: STATUS;
    action: 'login' | 'create'
}
