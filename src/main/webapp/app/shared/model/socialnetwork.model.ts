import { ILink } from 'app/shared/model//link.model';

export interface ISocialnetwork {
    id?: number;
    title?: string;
    url?: string;
    status?: boolean;
    links?: ILink[];
}

export class Socialnetwork implements ISocialnetwork {
    constructor(public id?: number, public title?: string, public url?: string, public status?: boolean, public links?: ILink[]) {
        this.status = this.status || false;
    }
}
