import { Injectable, isDevMode } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

const DEV_SOCKET_URL = `ws://localhost:8080/socket`;
const PROD_SOCKET_URL = `wss://galaxyvictor.com/socket/`;

export interface Message {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private subject: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.subject = <Subject<Message>>wsService
      .connect((isDevMode()) ? DEV_SOCKET_URL : PROD_SOCKET_URL)
      .pipe(
        map((response: MessageEvent): Message => {
          let type: string;
          let payload: any;

          try {
            const data = JSON.parse(response.data);
            type = data.type;
            payload = data.payload;
          } catch (error) {
            type = 'Error';
            payload = { name: error.name, message: error.message };
          }

          return { type: type, payload: payload };
        })
      );
  }

  send(msg: Message) {
    this.subject.next({type: msg.type, payload: msg.payload});
  }

  getMessages(): Observable<Message> {
    return this.subject.asObservable();
  }
}
