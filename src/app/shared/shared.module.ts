import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinner, AlertComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    LoadingSpinner,
    HttpClientModule,
    AlertComponent,
  ],
})
export class SharedModule {}
