import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule
  ]
})
export class UploadModule { }
