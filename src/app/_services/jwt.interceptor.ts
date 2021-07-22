import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User, UserClass } from '../_models/user';


import { mergeMap as _observableMergeMap, catchError as _observableCatch, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Router } from '@angular/router';

import { ALERT_TYPES } from '../_models/bankModel';

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    main_id = 0;
    user: User = {};
    authstatus: boolean = false;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(public authServ: AuthenticationService,public router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.authServ.globalUser.value) {
            const token = this.authServ.globalUser.value.sessionToken;
          //  console.log(token)
            request = request.clone({
                setHeaders: {
                    session_token: `${token}`,
                    imei: localStorage.getItem('imei')
                },
            });
        }else {
            const token = this.authServ.globalUser.value.sessionToken;
            request = request.clone({
                setHeaders: {
                    imei: localStorage.getItem('imei'),
                    session_token: `${token}`,
                },
                
            });
            console.log(localStorage.getItem('imei'));
        }

        return next.handle(request)
            .pipe(_observableCatch
                (
                    (response_: any) =>
            {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processResponse(<any>response_);
                } catch (e) {
                    return <Observable<any>><any>_observableThrow(e);
                }
            } else
                return <Observable<any>><any>_observableThrow(response_);
            }
            )
            );
    }

    protected processResponse(response: HttpResponseBase): Observable<any> {
      //  console.log(response);
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                console.log(_responseText);
           // result200 = VwUserObjApiResult.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData400) {
                result400 = {} as any;
                for (let key in resultData400) {
                    if (resultData400.hasOwnProperty(key))
                        result400![key] = resultData400[key];
                }
            }
            return throwException("Bad Request", status, _responseText, _headers, result400);
            }));
        }
        else if (status === 401) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result401: any = null;
                        
                return throwException("Unauthorized Request", status, _responseText, _headers, result401);
                })); 
        }
        else if (status === 403) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result403: any = null;                      
                return throwException("Forbidden, You don't have permission to access the Resource", status, _responseText, _headers, result403);
                })); 
        }     
        else if (status === 500) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("Server Error", status, _responseText, _headers);
            }));
        }
        //else if (status !== 200 && status !== 204) {
        //     return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        //     return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        //     }));
        // }
        return _observableOf<any>(<any>null);
    }
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}