import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog){}

  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        console.log(error);
        alert(error.status + error.statusText); //check console.log

        let errorMessage = "An unkown error occurred!";
        if(error) {
          errorMessage = error.status + " - " + error.statusText;

        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error);
        }
      })
    );
  }

}
