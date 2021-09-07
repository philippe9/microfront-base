import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SearchMultiCriteriaComponent} from '../search-multi-criteria/search-multi-criteria.component';

@Component({
  selector: 'microfi-input-for-search',
  templateUrl: './input-for-search.component.html',
  styleUrls: ['./input-for-search.component.scss']
})
export class InputForSearchComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onKeypressEvent(event: any) {
    console.log(event.target.value);


    const dialogRef = this.dialog.open(SearchMultiCriteriaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
