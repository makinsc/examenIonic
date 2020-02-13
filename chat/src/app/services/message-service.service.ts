import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { webSocket } from "rxjs/webSocket";
import { Subject, Observable } from 'rxjs';
import { map, flatMap, retry } from 'rxjs/operators';
import { messageoutputmodel } from '../models/messageoutput.model';
import { HttpClient } from '@angular/common/http'
import { messageinputmodel } from '../models/messageinput.model';
import { element } from 'protractor';
import { messajeViewModelmodel } from '../models/messajeViewModel.model';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private socket = webSocket(environment.urlWebSocket);

  public $observer = new Subject<messageoutputmodel>();
  constructor(private httpclient: HttpClient) {
    this.socket.subscribe(
      msg => {
        this.$observer.next(msg as messageoutputmodel);
      },
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('connection WebSocket closed') // Called when connection is closed (for whatever reason).
    );
  }

  sendMessage(newMsg: messageinputmodel): Observable<messageoutputmodel> {
    return this.httpclient.post(environment.urlAPI, newMsg) as Observable<messageoutputmodel>;
  }
  getAllMessages(owner: string): Observable<messajeViewModelmodel[]> {
    return (this.httpclient.get(environment.urlAPI) as Observable<messageoutputmodel[]>)
      .pipe(map(msg => msg.map((elem) => {
        let finalmsg: messajeViewModelmodel = {
          ...elem,
          formatDate: new Date(elem.date),
          class: (elem.user === owner) ? "right" : "left"
        }
        return finalmsg;
      }))) as Observable<messajeViewModelmodel[]>;
  }


}
