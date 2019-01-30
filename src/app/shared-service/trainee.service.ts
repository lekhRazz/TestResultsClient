import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trainee } from '../classes/trainee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private _http: HttpClient) { }

  createTraineeRecord(trainee: Trainee): Observable<any> {
    return this._http.post<any>(environment.baseUrl + 'trainee', trainee)
      .pipe(catchError(this.errorHandler));
  }

  getTrainees(): Observable<any> {
    return this._http.get<any>(environment.baseUrl + 'trainee/')
      .pipe(catchError(this.errorHandler));
  }

  updateTrainee(trainee: Trainee, id: String): Observable<any> {
    return this._http.put<any>(environment.baseUrl + 'trainee/' + id, trainee)
      .pipe(catchError(this.errorHandler))
  }

  getTraineeById(id: String): Observable<any> {
    return this._http.get<any>(environment.baseUrl + 'trainee/' + id)
      .pipe(catchError(this.errorHandler));
  }

  deleteTrainee(id: String) {
    return this._http.delete<any>(environment.baseUrl + 'trainee/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
