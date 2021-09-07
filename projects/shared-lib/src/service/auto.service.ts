import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from '../template/logout-dialog/logout-dialog.component';
import { AuthenticationService } from './authentication/authentication.service';
import { Logger } from './logger/logger.service';

const MINUTES_UNITL_AUTO_LOGOUT = 30// in Minutes
const CHECK_INTERVALL = 100 // in ms
const STORE_KEY = 'lastAction';

const log = new Logger('Microfi');

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(
    private authenticationService: AuthenticationService,
    private mdialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private ngZone: NgZone) {
    this.check();
    this.initListener();
    this.initInterval();
  }

  get lastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  set lastAction(value: any) {
    localStorage.setItem(STORE_KEY, value);
  }

  initListener() {
    /* this.mdialog.disableClose = true;
    this.mdialog.autoFocus = true;
    this.mdialog.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.mdialog.openDialogs(); */
    /* const snack = this.snackBar.open('Snack bar open before dialog'); */

    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('mouseover', () => this.reset());
      document.body.addEventListener('mouseout', () => this.reset());
      document.body.addEventListener('keydown', () => this.reset());
      document.body.addEventListener('keyup', () => this.reset());
      document.body.addEventListener('keypress', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    })
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout && this.authenticationService.isAuthenticated()) {
        log.error(`Sie wurden automatisch nach ${MINUTES_UNITL_AUTO_LOGOUT} Minuten Inaktivität ausgeloggt.`);
        this.authenticationService.logout();
        this.router.navigate(['login']);
        const dialogConfig = new MatDialogConfig();
        const approveCheckerDialogRef = this.mdialog.open(LogoutDialogComponent, {
          data: { heading: 'Deconnexion', dialogContext: 'You are deconnected ...' }
        });
        this.snackBar.open('Deconnexion...', 'Undo', {
          duration: 3000
        });
      }
    });
  }
}


