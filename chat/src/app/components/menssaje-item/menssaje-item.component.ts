import { Component, OnInit, Input } from '@angular/core';
import { messageoutputmodel } from 'src/app/models/messageoutput.model';
import { messajeViewModelmodel } from 'src/app/models/messajeViewModel.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-menssaje-item',
  templateUrl: './menssaje-item.component.html',
  styleUrls: ['./menssaje-item.component.scss'],
})
export class MenssajeItemComponent implements OnInit {
@Input() public mensajes:messajeViewModelmodel[];
  constructor() { }

  ngOnInit() {}

}
