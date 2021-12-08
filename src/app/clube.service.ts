import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Clube } from './clube';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubeService {
  url = 'http://localhost:3000/times';

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({"Content-type" : 'application/json'})
  }

  getTimes() : Observable<Clube[]> {
    return this.httpClient.get<Clube[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  getTime(id: number) : Observable<Clube> {
    return this.httpClient.get<Clube>(this.url + '/times/' + id)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    )
  }

  saveTime(time : Clube) : Observable<Clube> {
    return this.httpClient.post<Clube>(this.url, time, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  updateTime(time : Clube) : Observable<Clube> {
    return this.httpClient.put<Clube>(this.url+ '/' + time.id, time, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  deleteTime(time : Clube) : Observable<Clube> {
    return this.httpClient.delete<Clube>(this.url+ '/' + time.id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  handlerError(error : HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Código do erro: ${error.status},`
      + ` mensagem: ${errorMessage}`;
      console.log(errorMessage);
      
      return throwError(errorMessage);
    }
  }
}
