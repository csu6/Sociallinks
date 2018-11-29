import { ISocialnetwork } from 'app/shared/model//socialnetwork.model';
import { IUser } from 'app/core/user/user.model';

export interface ILink {
    id?: number;
    title?: string;
    description?: string;
    url?: string;
    socialnetwork?: ISocialnetwork;
    user?: IUser;
}

export class Link implements ILink {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public url?: string,
        public socialnetwork?: ISocialnetwork,
        public user?: IUser
    ) {}
}
