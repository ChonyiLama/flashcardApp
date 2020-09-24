import { Component, OnInit } from '@angular/core';
import { VOCABLIST } from '../vocablist-data';
import { VocablistDataService } from '../vocablist-data.service';


@Component({
  selector: 'app-vocab-table',
  templateUrl: './vocab-table.component.html',
  styleUrls: ['./vocab-table.component.css']
})
export class VocabTableComponent implements OnInit {

  constructor(private vocabListDataService: VocablistDataService) { }
  vocabWords = VOCABLIST;

  ngOnInit() {

  }
}
