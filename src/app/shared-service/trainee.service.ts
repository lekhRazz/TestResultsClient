import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trainee} from '../classes/trainee';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private _http: HttpClient) { }

  createTraineeRecord(trainee:Trainee):Observable<any>{
    return this._http.post<any>(environment.baseUrl+'trainee',trainee)
                .pipe(catchError(this.errorHandler));
  }

  getTrainees():Observable<any>{
    return this._http.get<any>(environment.baseUrl+'trainee/')
                .pipe(catchError(this.errorHandler));
  }

  updateTrainee(trainee:Trainee,id:String):Observable<any>{
    return this._http.put<any>(environment.baseUrl+'trainee/'+id,trainee)
                .pipe(catchError(this.errorHandler))
  }

  getTraineeById(id:String):Observable<any>{
    return this._http.get<any>(environment.baseUrl+'trainee/'+id)
                .pipe(catchError(this.errorHandler));
  }

  deleteTrainee(id:String){
    return this._http.delete<any>(environment.baseUrl+'trainee/'+id)
                .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
}
}
