import { IUser } from 'app/core/user/user.model';

export const enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE'
}

export interface IUserExtra {
    id?: number;
    photoContentType?: string;
    photo?: any;
    phone?: string;
    description?: string;
    gender?: Gender;
    user?: IUser;
}

export class UserExtra implements IUserExtra {
    constructor(
        public id?: number,
        public photoContentType?: string,
        public photo?: any,
        public phone?: string,
        public description?: string,
        public gender?: Gender,
        public user?: IUser
    ) {}
}
