import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddWordFormComponent } from './add-word-form/add-word-form.component';
import { VocablistDataService } from './vocablist-data.service';
import { HttpClientModule } from '@angular/common/http';
// Required for form table
import { ReactiveFormsModule } from '@angular/forms';
import { VocabTableComponent } from './vocab-table/vocab-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWordFormComponent,
    VocabTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [VocablistDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
