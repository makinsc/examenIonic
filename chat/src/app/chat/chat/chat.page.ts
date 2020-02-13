import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageServiceService } from 'src/app/services/message-service.service';
import { messageinputmodel } from 'src/app/models/messageinput.model';
import { messageoutputmodel } from 'src/app/models/messageoutput.model';
import { messajeViewModelmodel } from 'src/app/models/messajeViewModel.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
public nick:string;
public input:string;
public messageList:messajeViewModelmodel[]=[];
  constructor(private router: ActivatedRoute,private srvMessages:MessageServiceService) { }

  ngOnInit() {    
    console.log("params:", this.router.params);
    this.router.params.subscribe((_params:{nick:string})=>{
      this.nick = _params.nick;      
    });

    this.srvMessages.getAllMessages(this.nick).subscribe((msgList)=>{      
      this.messageList =msgList;
    });

    this.srvMessages.$observer.subscribe((msg)=>{ 
      let msgviewmodel: messajeViewModelmodel=
      {
        ...msg,
        formatDate: new Date(msg.date),
        class: (this.nick===msg.user)?"right":"left"
      }    
      this.messageList = this.messageList.concat(msgviewmodel);
    });
  }

  insertar() {
    //llamada al servicio    
    if (this.input !== '') {
      let messagemodel:messageinputmodel ={
        user:this.nick,
        text:this.input
      };
      this.srvMessages.sendMessage(messagemodel).subscribe((model)=>{
        console.log(model);
      },err=>{
        console.log
      });      
      this.input = "";
    }
  }

}
