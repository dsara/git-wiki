import {Injectable, Input, Output, EventEmitter} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";

import {IWikiUser} from '../../../interfaces';
import {HttpHeadersService} from "../../shared/services/http-headers.service";

import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class WikiUserService {

    constructor(private http: Http, private httpHeaders: HttpHeadersService) { }

    loginUser(user: IWikiUser) {
        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/login", JSON.stringify(user), reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    createUser(user: IWikiUser) {
        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/register", JSON.stringify(user), reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    // saveToken(token: string): void {
    //     window.localStorage.setItem('mean-token', token);
    // }

    // getToken(): string {
    //     return window.localStorage.getItem('mean-token');
    // }

    // logout(): void {
    //     window.localStorage.removeItem('mean-token');
    // }

    private handleError(error: Response): ErrorObservable {
        return Observable.throw(error || "Server error");
    }
}