import { Component, OnInit } from '@angular/core';
import { VocablistDataService } from './vocablist-data.service';
import { VOCABLIST } from './vocablist-data';
import { HostListener } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flashcard-app';
  vocabName = 'Upload Excel File';
  vocabAltnames = '';
  vocabMeaning = '';
  vocabWords = VOCABLIST;
  frontCard = 'Show English First';
  showTibetan = true;
  /* used for reading excel file **/
  vocabFileUrl = 'assets/vocabwords.xlsx';

  /* Right keyboard to see next card, Enter to flip card **/
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('key event is ', event.keyCode);
    if (event.keyCode === 39) {
      this.showRandomWord();
    }
    if (event.keyCode === 13) {
      this.toggleFrontCard();
    }
  }

  constructor(private vocabListDataService: VocablistDataService, private http: HttpClient) { }

  ngOnInit() {
    this.readVocabFile();
  }

  showRandomWord(): void {
    const randomWord = this.vocabListDataService.getRandomWord();
    this.vocabName = randomWord.get('name');
    this.vocabAltnames = randomWord.get('alt_names');
    this.vocabMeaning = randomWord.get('meaning');
  }

  toggleFrontCard() {
    this.showTibetan = !this.showTibetan;
    this.frontCard = (this.showTibetan) ? 'Show English first' : 'Show Tibetan first';
  }

  /* To automatically read excel file with vocab words from assets folder **/
  readVocabFile() {
    const fileReader = new FileReader();
    this.http.get(this.vocabFileUrl, {responseType: 'arraybuffer'}).subscribe(data => {
      console.log(data);
      const newdata = new Uint8Array(data);
      const arr = new Array();
      for (let i = 0; i !== newdata.length; ++i) {
        arr[i] = String.fromCharCode(newdata[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const worksheet_json = (XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log('Sheet Names:' + workbook.SheetNames);
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      for (const word of worksheet_json) {
        this.vocabListDataService.addWord(word['name'], word['alt-names'], word['meaning']);
      }
      this.showRandomWord();
    });
  }
}
