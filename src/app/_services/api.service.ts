import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse,HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { intratransferM, nipenquiry,niptransfer,cashdepositM,inwardchqPost } from '../_models/bankModel';
import { getAllAccountDetailsResult } from '../_models/bankapiresult/getAllAccountDetailsResult';
import { doNameEnquiryResult } from '../_models/bankapiresult/doNameEnquiryResult';
import { getBanksListResult } from '../_models/bankapiresult/getBanksListResult'; 
import { postIntraTransferResult } from '../_models/bankapiresult/postIntraTransferResult';
import { nipTransferResult } from '../_models/bankapiresult/nipTransferResult';
import { tellerCashDepositResult } from '../_models/bankapiresult/tellerCashDepositResult';

import { inwardchqpostResult } from '../_models/bankapiresult/inwardchqpostResult';
import { authorizeinwardchqResult } from '../_models/bankapiresult/authorizeinwardchqResult';

@Injectable()
export class ApiProvider {
  Urlbase: string = "http://10.55.15.50:9895/LOTUS/api/v1.0.0/";
  urlbaseSec: string = "http://10.55.15.55:9042/api/LotusBank/";

  constructor(public http: HttpClient) {}
 
  sentOTP(otp:number, phone:string) {
    let options = {headers: new HttpHeaders(
    {'Content-Type': 'application/json'})}
    let msg:string = 'Your OTP to continue your process is ' + otp;
    let endPoint: string = 'https://qatestbed.azurewebsites.net/test/sendsms?phoneNo='+encodeURI(phone)+'&msg='+encodeURI(msg);
    var _result = this.http.get<getAllAccountDetailsResult>(this.Urlbase + endPoint,options);
    return _result;
  }


  getAllAccountDetails(accountnumber?:number):Observable<getAllAccountDetailsResult> {
    let options = {headers: new HttpHeaders(
    {'Content-Type': 'application/json'})}
    let endPoint: string = 'party/getAllAccountDetails/'+ accountnumber;
    var _result = this.http.get<getAllAccountDetailsResult>(this.Urlbase + endPoint,options);
    return _result;
  }
  getBanksList():Observable<getBanksListResult> {
    let options = {headers: new HttpHeaders(
    {'Content-Type': 'application/json'})}
    let endPoint: string = 'party/GETFIList';
    var _result = this.http.get<getBanksListResult>(this.Urlbase + endPoint,options);
    return _result;
  }

  postIntraTransfer(transferDetails: intratransferM) : Observable<postIntraTransferResult> {
    let options = {headers: new HttpHeaders(
      {"appID": "OzayConsulting",
    "authID": "89514faa-e2ad-4d92-8004-52ecccd88f05",
    "Content-Type": "application/json"})}  
    let endPoint: string = 'party/createSingleGenericTransfer';     
    return this.http.post<postIntraTransferResult>(this.Urlbase + endPoint,transferDetails, options)
    .pipe(catchError(this.handleError<any>('intraTransfer')));
  }

  nipNameEnquiry(enquiryDetails:nipenquiry) : Observable<doNameEnquiryResult> {
    let options = {headers: new HttpHeaders(
      {"appID": "OzayConsulting",
    "authID": "89514faa-e2ad-4d92-8004-52ecccd88f05",
    "Content-Type": "application/json"})}  
    let endPoint: string = 'NIP/doNameEnquiry';     
    return this.http.post<doNameEnquiryResult>(this.urlbaseSec + endPoint,enquiryDetails, options)
    .pipe(catchError(this.handleError<any>('nipenquiry')));
  }

  nipTransfer(transferDetails:niptransfer) : Observable<nipTransferResult> {
    let options = {headers: new HttpHeaders(
      {"appID": "OzayConsulting",
    "authID": "89514faa-e2ad-4d92-8004-52ecccd88f05",
    "Content-Type": "application/json"})}  
    let endPoint: string = 'party/NIPTransfer';     
    return this.http.post<nipTransferResult>(this.Urlbase + endPoint,transferDetails, options)
    .pipe(catchError(this.handleError<any>('niptransfer')));
  }

    
  tellerCashDeposit(depositDetails:cashdepositM) :Observable<tellerCashDepositResult> {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json', 
    "credentials":"CHANNEL1/123456"
    })}  
    let endPoint: string = 'party/tellerCashDeposit';     
    return this.http.post<tellerCashDepositResult>(this.Urlbase + endPoint,depositDetails, options)
    .pipe(catchError(this.handleError<any>('cashdeposit')));
  }

  inwardchqPost(chqDetails:inwardchqPost) : Observable<inwardchqpostResult> {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json', 
    "credentials":"CHANNEL1/123456"
    })}  
    let endPoint: string = 'party/inwardChequePost';     
    return this.http.post<inwardchqpostResult>(this.Urlbase + endPoint,chqDetails, options)
    .pipe(catchError(this.handleError<any>('inwardchq')));
  }

  
  authorizeinwardchq(id:number) : Observable<authorizeinwardchqResult> {
    let options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json', 
    "credentials":"CHANNEL1/123456"
    })}  
    let endPoint: string = 'party/authorizeInwardCheque/'+id;     
    return this.http.put<authorizeinwardchqResult>(this.Urlbase + endPoint,{}, options)
    .pipe(catchError(this.handleError<any>('authorizeinwardchq')));
  }

  private handleError<T> (operation = 'operation', result?:T)
{
    return (error: any): Observable<T> => {
        return of(error);
    }
}


}
