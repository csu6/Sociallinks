import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILink } from 'app/shared/model/link.model';

type EntityResponseType = HttpResponse<ILink>;
type EntityArrayResponseType = HttpResponse<ILink[]>;

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public resourceUrl = SERVER_API_URL + 'api/links';

    constructor(private http: HttpClient) {}

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILink>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILink[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
}
