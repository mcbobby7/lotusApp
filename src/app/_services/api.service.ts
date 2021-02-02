import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse,HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { intratransferM, nipenquiry,niptransfer,cashdepositM,inwardchqPost } from '../_models/bankModel';

@Injectable()
export class ApiProvider {
  Urlbase: string = "http://10.55.15.50:9895/LOTUS/api/v1.0.0/";
  urlbaseSec: string = "http://10.55.15.55:9042/api/LotusBank/";

  constructor(public http: HttpClient) {}

  getAllAccountDetails(accountnumber?:number):Observable<any> {
    let options = {headers: new HttpHeaders(
    {'Content-Type': 'application/json'})}
    let endPoint: string = 'party/getAllAccountDetails/'+ accountnumber;
    var _result = this.http.get<any>(this.Urlbase + endPoint,options);
    return _result;
  }
  getBanksList():Observable<any> {
    let options = {headers: new HttpHeaders(
    {'Content-Type': 'application/json'})}
    let endPoint: string = 'party/GETFIList';
    var _result = this.http.get<any>(this.Urlbase + endPoint,options);
    return _result;
  }

  postIntraTransfer(transferDetails: intratransferM) {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json'})}  
    let endPoint: string = 'party/createSingleGenericTransfer';     
    return this.http.post(this.Urlbase + endPoint,transferDetails, options)
    .pipe(catchError(this.handleError<any>('intraTransfer')));
  }

  nipNameEnquiry(enquiryDetails:nipenquiry) {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json'})}  
    let endPoint: string = 'NIP/doNameEnquiry';     
    return this.http.post(this.urlbaseSec + endPoint,enquiryDetails, options)
    .pipe(catchError(this.handleError<any>('nipenquiry')));
  }

  nipTransfer(transferDetails:niptransfer) {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json'})}  
    let endPoint: string = 'party/NIPTransfer';     
    return this.http.post(this.Urlbase + endPoint,transferDetails, options)
    .pipe(catchError(this.handleError<any>('niptransfer')));
  }

    
  tellerCashDeposit(depositDetails:cashdepositM) {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json'})}  
    let endPoint: string = 'party/tellerCashDeposit';     
    return this.http.post(this.Urlbase + endPoint,depositDetails, options)
    .pipe(catchError(this.handleError<any>('cashdeposit')));
  }

  inwardchqPost(chqDetails:inwardchqPost) {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json'})}  
    let endPoint: string = 'party/inwardChequePost';     
    return this.http.post(this.Urlbase + endPoint,chqDetails, options)
    .pipe(catchError(this.handleError<any>('inwardchq')));
  }

  
  authorizeinwardchq(id:number) {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json'})}  
    let endPoint: string = 'party/authorizeInwardCheque/'+id;     
    return this.http.put(this.Urlbase + endPoint,{}, options)
    .pipe(catchError(this.handleError<any>('authorizeinwardchq')));
  }

  private handleError<T> (operation = 'operation', result?:T)
{
    return (error: any): Observable<T> => {
        return of(error);
    }
}


}
