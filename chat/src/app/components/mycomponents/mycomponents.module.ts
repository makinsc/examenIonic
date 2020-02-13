import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenssajeItemComponent } from '../menssaje-item/menssaje-item.component';



@NgModule({
  declarations: [MenssajeItemComponent],
  imports: [
    CommonModule
  ],
  exports:[MenssajeItemComponent]
})
export class MycomponentsModule { }
