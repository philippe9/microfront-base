import { Component, Injector, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'microfi-main',
  template: '',
  providers: []
})
export class MainComponent extends AbstractComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  selectedItemOnTables:any = { code: "" };
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.logger.debug("Init data");
    this.logger.debug(this.base);
  }

  search() {
    this.builSearchCriterias();
  }

  public set datasource(datasource: any) {
    this.datasource = datasource;
  }

  ngAfterViewInit() {
    this.dataSource ? this.dataSource.paginator = this.paginator : '';
  }

  selectedItemFromTable(item: any) {
    console.log(item);
    this.selectedItemOnTables = item;
  }
  dateFormatter(date) {
    date = new Date(date);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  }
  dateFormatterInvert(date) {
    date = new Date(date);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
