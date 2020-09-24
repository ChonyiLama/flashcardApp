import { Injectable } from '@angular/core';
import { VOCABLIST } from './vocablist-data';

@Injectable({
  providedIn: 'root'
})
export class VocablistDataService {
  constructor() { }

  addWord(name, alt_names, meaning): void {
    const word = new Map();
    word.set('name', name);
    word.set('alt_names', alt_names);
    word.set('meaning', meaning);
    VOCABLIST.push(word);
  }

  removeWord(name): void {
    VOCABLIST.forEach((element, index) => {
      if (element.get('name') === name) {
        delete VOCABLIST[index];
        console.log('removing word ', element);
      }
    });
  }

  getRandomWord(): Map<any, any> {
    return VOCABLIST[Math.floor(Math.random() * VOCABLIST.length)];
  }
  // If easy, lower the chance that it will show up.
  // Click 'EASY'-> store index of word->

  getVocabList(): any {
    return VOCABLIST;
  }

}
