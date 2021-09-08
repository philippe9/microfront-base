/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** Environment Configuration */
import { environment } from '../../environments/environment.prod';

/** Custom Services */
import { Logger } from '../logger/logger.service';
import { AlertService } from '../alert/alert.service';
import { AlertType } from '../alert/alert.model';

/** Initialize Logger */
const log = new Logger('ErrorHandlerInterceptor');

/**
 * Http Request interceptor to add a default error handler to requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  /**
   * @param {AlertService} alertService Alert Service.
   */
  constructor(private alertService: AlertService) {
  }

  /**
   * Intercepts a Http request and adds a default error handler.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Error handler.
   */
  private handleError(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const status = response.status;
    console.log(response);
    let errorMessage = (response.error?.developerMessage || response.message);
    if (response.error?.errors) {
      if (response.error.errors[0]) {
        errorMessage = response.error.errors[0].defaultUserMessage || response.error.errors[0]?.developerMessage;
      }
    }

    if (!environment.production) {
      log.error(`Request Error: ${errorMessage}`);
    }

    if (status === 401 || (environment.oauth.enabled && status === 400)) {
      this.alertService.alert({
        type: AlertType.AUTHENTICATIONERROR,
        message: 'Invalid User Details. Please try again!'
      });
    } else if (status === 403 && errorMessage === 'The provided one time token is invalid') {
      this.alertService.alert({ type: AlertType.INVALIDTOKEN, message: 'Invalid Token. Please try again!' });
    } else if (status === 400) {
      this.alertService.alert({ type: AlertType.BADREQUEST, message: 'Invalid parameters were passed in the request!' });
    } else if (status === 403) {
      this.alertService.alert({
        type: AlertType.UNAUTHORIZEDREQUEST,
        message: errorMessage || 'You are not authorized for this request!'
      });
    } else if (status === 404) {
      this.alertService.alert({
        type: AlertType.RESOURCEDOESNOTEXIST,
        message: errorMessage || 'Resource does not exist!'
      });
    } else if (status === 500) {
      this.alertService.alert({
        type: AlertType.INTERNALSERVERERROR,
        message: 'Internal Server Error. Please try again later.'
      });
    } else {
      this.alertService.alert({ type: AlertType.UNKNOWNERROR, message: 'Unknown Error. Please try again later.' });
    }

    throw response;
  }

}
