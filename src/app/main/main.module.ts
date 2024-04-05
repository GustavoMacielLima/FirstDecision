import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule
  ]
})
export class MainModule { }
