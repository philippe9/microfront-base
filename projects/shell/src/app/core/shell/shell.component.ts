import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProgressBarService } from 'projects/shared-lib/src/service/progress-bar/progress-bar.service';

@Component({
  selector: 'microfi-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  /** Subscription to breakpoint observer for handset. */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  /** Sets the initial state of sidenav as collapsed. Not collapsed if false. */
  sidenavCollapsed = true;
  /** Progress bar mode. */
  progressBarMode: string;
  /** Subscription to progress bar. */
  progressBar$: Subscription;

  /**
   * @param {BreakpointObserver} breakpointObserver Breakpoint Observer to detect screen size.
   * @param {ProgressBarService} progressBarService Progress Bar Service.
   * @param {ChangeDetectorRef} cdr Change Detector Ref.
   */
  constructor(private breakpointObserver: BreakpointObserver,
    private progressBarService: ProgressBarService,
    private cdr: ChangeDetectorRef) {
  }

  /**
   * Subscribes to progress bar to update its mode.
   */
  ngOnInit() {
    this.progressBar$ = this.progressBarService.updateProgressBar.subscribe((mode: string) => {
      this.progressBarMode = mode;
      this.cdr.detectChanges();
    });
  }

  /**
   * Toggles the current collapsed state of sidenav according to the emitted event.
   * @param {boolean} event denotes state of sidenav
   */
  toggleCollapse($event: boolean) {
    this.sidenavCollapsed = $event;
    this.cdr.detectChanges();
  }

  /**
   * Unsubscribes from progress bar.
   */
  ngOnDestroy() {
    this.progressBar$.unsubscribe();
  }

}
