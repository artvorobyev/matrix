import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputStateComponent } from './containers/input-state/input-state.component';
import { StartStateComponent } from './containers/start-state/start-state.component';
import { ResultStateComponent } from './containers/result-state/result-state.component';

@NgModule({
  declarations: [
    AppComponent,
    InputStateComponent,
    StartStateComponent,
    ResultStateComponent,
  ],
  imports: [BrowserModule, CommonModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
