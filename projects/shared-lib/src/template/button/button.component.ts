import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'microfi-button',
  template: `
  <button mat-raised-button  type="button" class="btn">{{name}}
         <fa-icon *ngIf=iconName icon="{{iconName}}" size="lg"></fa-icon>
  </button>
  `,
  styles: [`
  microfi-button {
      color: black;
  }
  `]
})
export class ButtonComponent implements ControlValueAccessor, OnInit {

  @Input() name: string;
  @Input() iconName: string;
  @Output() onClick = new EventEmitter<any>();
  @Input() color: string;

  constructor() {
    this.color = this.color ? this.color : "primary";
  }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }
}
