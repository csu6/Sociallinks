import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISocialnetwork } from 'app/shared/model/socialnetwork.model';

type EntityResponseType = HttpResponse<ISocialnetwork>;
type EntityArrayResponseType = HttpResponse<ISocialnetwork[]>;

@Injectable({ providedIn: 'root' })
export class SocialnetworkService {
    public resourceUrl = SERVER_API_URL + 'api/socialnetworks';

    constructor(private http: HttpClient) {}

    create(socialnetwork: ISocialnetwork): Observable<EntityResponseType> {
        return this.http.post<ISocialnetwork>(this.resourceUrl, socialnetwork, { observe: 'response' });
    }

    update(socialnetwork: ISocialnetwork): Observable<EntityResponseType> {
        return this.http.put<ISocialnetwork>(this.resourceUrl, socialnetwork, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + `${this.resourceUrl}/${id}`);
        return this.http.get<ISocialnetwork>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISocialnetwork[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
