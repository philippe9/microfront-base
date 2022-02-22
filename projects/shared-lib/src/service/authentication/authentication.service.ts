import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
// import { AbstractComponent } from 'src/app/template/abstract/abstract.component';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { Credentials } from './credentials.model';
import { LoginContext } from './login-context.model';
import { OAuth2Token } from './o-auth2-token.model';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private storage: any;
  /** User credentials. */
  private credentials: Credentials;
  /** Key to store credentials in storage. */
  private credentialsStorageKey = 'microfiXCredentials';
  /** Key to store oauth token details in storage. */
  private oAuthTokenDetailsStorageKey = 'microfiXOAuthTokenDetails';
  /** Key to store two factor authentication token in storage. */
  private twoFactorAuthenticationTokenStorageKey = 'microfiXTwoFactorAuthenticationToken';
  /** User additional information when they are authenticated. */
  public user: any = {};

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private authenticationInterceptor: AuthenticationInterceptor) {
    this.storage = sessionStorage;
    const savedCredentials = JSON.parse(
      sessionStorage.getItem(this.credentialsStorageKey) || this.storage.getItem(this.credentialsStorageKey)
    );
    if (savedCredentials) {
      const twoFactorAccessToken = JSON.parse(this.storage.getItem(this.twoFactorAuthenticationTokenStorageKey));
      authenticationInterceptor.setAuthorizationToken(savedCredentials?.message, savedCredentials.token_type);
      if (twoFactorAccessToken) {
        authenticationInterceptor.setTwoFactorAccessToken(twoFactorAccessToken.token);
      }
    }
  }
  login(loginContext: LoginContext): Observable<any> {
    this.alertService.alert({ type: AlertType.AUTHENTICATIONSTART, message: 'Please wait...' });
    this.storage = sessionStorage;
    if (environment.keycloak.enabled) {
      let params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', 'microfi-web-api');
      params.append('client_secret', '856e842c-9414-4358-8813-6a06141222f4');
      params.append('username', loginContext.login);
      params.append('password', loginContext.password);
      params.append('newPassword', loginContext.newPassword);
      params.append('confirmation', loginContext.confirmation);
      params.append('scope', 'openid');
      const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
      return this.http.disableApiPrefix().post(`${environment.keycloak.serverUrl}/token`, params.toString(), { headers: headers, responseType: 'json' })
        .pipe(
          tap((tokenResponse: OAuth2Token) => {
            this.saveOAuth2Token(tokenResponse);
          })
        );
    } else if (environment.jwt.enabled) {
      let params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', loginContext.login);
      params.append('password', loginContext.password);
      params.append('scope', 'read');
      const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', Authorization: "Basic Y2xpZW50OnNlY3JldA==" });
      return this.http.disableApiPrefix().post(`${environment.jwt.serverUrl}/token`, params.toString(), { headers: headers, responseType: 'json' })
        .pipe(
          map((tokenResponse: OAuth2Token) => {
            this.saveOAuth2Token(tokenResponse);
            return of(true);
          })
        );
    } else if (environment.oauth.enabled) {
      let httpParams = new HttpParams();
      httpParams = httpParams.set('client_id', 'community-app');
      httpParams = httpParams.set('grant_type', 'password');
      httpParams = httpParams.set('client_secret', '123');
      return this.http.disableApiPrefix().post(`${environment.oauth.serverUrl}auth/login`, loginContext)
        .pipe(
          tap((credentials: Credentials) => {
            this.onLoginSuccess(credentials);
          })
        );
    }

  }

  saveOAuth2Token(token: OAuth2Token) { // when authentication successful
    this.storage.setItem(this.oAuthTokenDetailsStorageKey, JSON.stringify(token));
    const tokenExpiresDate = (new Date().getTime()) + (1000 * token.expires_in);
    this.authenticationInterceptor.setAuthorizationToken(token.id_token || token.access_token, token.token_type);
    const credentials = JSON.parse(this.storage.getItem(this.credentialsStorageKey)) || {};
    credentials.message = token.id_token || token.access_token;
    credentials.expirationDate = tokenExpiresDate;
    credentials.token_type = token.token_type;
    if (token.refresh_expires_in) {
      const refreshExpiresDate = (new Date().getTime()) + (1000 * token.refresh_expires_in);
      credentials.refreshExpirationDate = refreshExpiresDate;
    }
    this.onLoginSuccess(credentials);

  }
  getTokenClaims() {
    const accessToken = JSON.parse(this.storage.getItem(this.oAuthTokenDetailsStorageKey))?.access_token;
    return helper.decodeToken(accessToken);
  }
  getHabilitations() { // when using keycloak
    return this.getTokenClaims()?.realm_access?.roles || [];
  }
  getProfilsAndHabilitations(): Observable<any> { // when using own jwt
    return this.http.post(`${environment.api.userCredentials}/userinfo`, {})
      .pipe(
        tap((profileResponse: any) => {
          this.user = profileResponse;
        })
      );
  }
  isTokenExpire() {
    if (!this.credentials) { return null; }
    if ((new Date()).getTime() > (this.credentials.refreshExpiresIn)) {
      this.logout();
      return true;
    }
    return (new Date()).getTime() > this.credentials.tokenExpiresIn;
  }
  getUserDetails() {
    let userHab = {};
    if (environment.jwt.enabled) {
      userHab = this.user;
    } else if (environment.keycloak.enabled) {
      const token = this.storage.getItem(this.oAuthTokenDetailsStorageKey) || {};
      userHab = helper.decodeToken(JSON.parse(token).id_token) || {};
    }
    return userHab
  }



  /**
   * Refreshes the oauth2 authorization token.
   */
  refreshOAuthAccessToken() {
    const oAuthRefreshToken = JSON.parse(this.storage.getItem(this.oAuthTokenDetailsStorageKey));
    if (!oAuthRefreshToken) return;
    this.authenticationInterceptor.removeAuthorization();
    if (environment.keycloak.enabled) {
      let params = new URLSearchParams();
      params.append('client_id', 'microfi-web-api');
      params.append('client_secret', '856e842c-9414-4358-8813-6a06141222f4');
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', oAuthRefreshToken.refresh_token);
      const headers = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      });
      return this.http.disableApiPrefix().post(`${environment.keycloak.serverUrl}/token`, params.toString(), { headers: headers, responseType: 'json' })
        .subscribe((tokenResponse: OAuth2Token) => this.saveOAuth2Token(tokenResponse));
    } else {
      let httpParams = new HttpParams();
      httpParams = httpParams.set('client_id', 'community-app');
      httpParams = httpParams.set('grant_type', 'refresh_token');
      httpParams = httpParams.set('client_secret', '123');
      httpParams = httpParams.set('refresh_token', oAuthRefreshToken);
      this.http.disableApiPrefix().post(`${environment.oauth.serverUrl}/oauth/token`, {}, { params: httpParams })
        .subscribe((tokenResponse: OAuth2Token) => {
          this.storage.setItem(this.oAuthTokenDetailsStorageKey, JSON.stringify(tokenResponse));
          this.authenticationInterceptor.setAuthorizationToken(tokenResponse.id_token || tokenResponse.access_token, tokenResponse.token_type);
          const credentials = JSON.parse(this.storage.getItem(this.credentialsStorageKey));
          credentials.message = tokenResponse.id_token || tokenResponse.access_token;
          credentials.token_type = tokenResponse.token_type;
          this.storage.setItem(this.credentialsStorageKey, JSON.stringify(credentials));
        });
    }
  }

  /**
   * Sets the authorization token followed by one of the following:
   *
   * Sends an alert if two factor authentication is required.
   *
   * Sends an alert if password has expired and requires a reset.
   *
   * Sends an alert on successful login.
   * @param {Credentials} credentials Authenticated user credentials.
   */
  private onLoginSuccess(credentials: Credentials) {
    if (environment.oauth.enabled) {
      this.authenticationInterceptor.setAuthorizationToken(credentials.message, credentials.token_type);
    } else {
      this.credentials = credentials;
      this.authenticationInterceptor.setAuthorizationToken(credentials.message, credentials.token_type);
    }
    if (false) {
      this.credentials = credentials;
      this.alertService.alert({ type: AlertType.TWOFACTORAUTHENTICATIONREQUIRED, message: 'Two Factor Authentication Required' });
    } else {
      if (credentials.hasOwnProperty("status")) {
        this.credentials = credentials;
        this.alertService.alert({ type: AlertType.FAILED, message: 'Invalid entries!' });
      } else {
        this.setCredentials(credentials);
        this.alertService.alert({ type: AlertType.AUTHENTICATIONSUCCESS, message: `you are logged in successfully!` });
        delete this.credentials;
      }
    }
  }

  /**
   * Logs out the authenticated user and clears the credentials from storage.
   * @returns {Observable<boolean>} True if the user was logged out successfully.
   */
  logout() {
    const twoFactorToken = this.storage.getItem(this.twoFactorAuthenticationTokenStorageKey);
    if (twoFactorToken) {
      this.http.post('/twofactor/invalidate', { token: JSON.parse(twoFactorToken).token }).subscribe();
      this.authenticationInterceptor.removeTwoFactorAuthorization();
    }
    this.authenticationInterceptor.removeAuthorization();
    this.setCredentials();
    window.location.reload()
    return of(true);
  }

  /**
   * Checks if the two factor access token for authenticated user is valid.
   * @returns {boolean} True if the two factor access token is valid or two factor authentication is not required.
   */
  twoFactorAccessTokenIsValid(): boolean {
    const twoFactorAccessToken = this.storage.getItem(this.twoFactorAuthenticationTokenStorageKey);
    if (twoFactorAccessToken) {
      return ((new Date()).getTime() < JSON.parse(twoFactorAccessToken).validTo);
    }
    return true;
  }

  /**
   * Checks if the user is authenticated.
   * @returns {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return JSON.parse(
      sessionStorage.getItem(this.credentialsStorageKey) || this.storage.getItem(this.credentialsStorageKey)
    )
    // && this.twoFactorAccessTokenIsValid());
  }

  /**
   * Gets the user credentials.
   * @returns {Credentials} The user credentials if the user is authenticated otherwise null.
   */
  getCredentials(): Credentials | null {
    return JSON.parse(this.storage.getItem(this.credentialsStorageKey));
  }

  /**
   * Sets the user credentials.
   *
   * The credentials may be persisted across sessions by setting the `rememberMe` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   *
   * @param {Credentials} credentials Authenticated user credentials.
   */
  private setCredentials(credentials?: Credentials) {
    if (credentials) {
      this.storage.setItem(this.credentialsStorageKey, JSON.stringify(credentials));
    } else {
      this.storage.removeItem(this.credentialsStorageKey);
      this.storage.removeItem(this.oAuthTokenDetailsStorageKey);
      this.storage.removeItem(this.twoFactorAuthenticationTokenStorageKey);
    }
  }

  /**
   * Following functions are for two factor authentication and require
   * first level authorization headers to be setup for the requests.
   */

  /**
   * Gets the two factor authentication delivery methods available for the user.
   */
  getDeliveryMethods() {
    return this.http.get('/twofactor');
  }

  /**
   * Requests OTP to be sent via the given delivery method.
   * @param {any} deliveryMethod Delivery method for the OTP.
   */
  requestOTP(deliveryMethod: any) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('deliveryMethod', deliveryMethod.name);
    return this.http.post(`/twofactor`, {}, { params: httpParams });
  }

  /**
   * Validates the OTP and authenticates the user on success.
   * @param {string} otp
   */
  validateOTP(otp: string) {
    const httpParams = new HttpParams().set('token', otp);
    return this.http.post(`/twofactor/validate`, {}, { params: httpParams })
      .pipe(
        map(response => {
          this.onOTPValidateSuccess(response);
        })
      );
  }

  /**
   * Sets the two factor authorization token followed by one of the following:
   *
   * Sends an alert if password has expired and requires a reset.
   *
   * Sends an alert on successful login.
   * @param {any} response Two factor authentication token details.
   */
  private onOTPValidateSuccess(response: any) {
    this.authenticationInterceptor.setTwoFactorAccessToken(response.token);
    if (this.credentials.object.defaultPassword) {
      this.alertService.alert({ type: AlertType.PASSWORDEXPIRED, message: 'Your password has expired, please reset your password!' });
    } else {
      this.setCredentials(this.credentials);
      this.alertService.alert({ type: AlertType.AUTHENTICATIONSUCCESS, message: `${this.credentials.object.nom} successfully logged in!` });
      delete this.credentials;
      this.storage.setItem(this.twoFactorAuthenticationTokenStorageKey, JSON.stringify(response));
    }
  }
  /**
   * Change the user's password and authenticates the user.
   * @param {any} passwordDetails New password.
   */
  setUpAccount(loginContext: LoginContext) {
    const passwordDetails = {
      currentPassword: loginContext.password,
      newPassword: loginContext.newPassword,
      confirmation: loginContext.confirmation
    };
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + JSON.parse(this.storage.getItem(this.oAuthTokenDetailsStorageKey)).access_token });
    return this.http.disableApiPrefix().post(`${environment.keycloak.serverUrl}/credentials/password`, passwordDetails, { responseType: 'json' }).
      pipe(
        tap(() => {
          this.alertService.alert({ type: AlertType.PASSWORDRESETSUCCESS, message: `Your password was changed sucessfully!` });
          this.saveOAuth2Token(this.storage.getItem(this.oAuthTokenDetailsStorageKey));
        })
      );
  }
  /**
   * Resets the user's password and authenticates the user.
   * @param {any} passwordDetails New password.
   */
  // resetPassword(passwordDetails: any) {
  //   return this.http.put(`/users/${this.credentials.object.code}`, passwordDetails).
  //     pipe(
  //       map(() => {
  //         this.alertService.alert({ type: AlertType.PASSWORDRESETSUCCESS, message: `Your password was sucessfully reset!` });
  //         this.authenticationInterceptor.removeAuthorization();
  //         this.authenticationInterceptor.removeTwoFactorAuthorization();
  //         const loginContext: LoginContext = {
  //           login: this.credentials.object.code,
  //           passe: passwordDetails.password,
  //           agence: this.settingService.server.code
  //         };
  //         this.login(loginContext).subscribe();
  //       })
  //     );
  // }

}
