import { PlanetDTO } from './../dtos/planet';
import { Store } from './../store';
import { Injectable, isDevMode } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { Planet } from '../game-objects/planet';

const DEV_SOCKET_URL = `ws://localhost:8080/socket`;
const PROD_SOCKET_URL = `wss://galaxyvictor.com/socket/`;

export interface Message {
  type: string;
  payload: any;
}

interface ExploringResultDTO {
  starSystem: number;
  planets: PlanetDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private subject: Subject<Message>;

  constructor(wsService: WebsocketService, private store: Store) {
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

    this.getMessages().subscribe((m: Message) => {
      console.log(m);
      if (m.type === 'ExploringResult') {
        const exploringResult = m.payload as ExploringResultDTO;
        exploringResult.planets.forEach((p: PlanetDTO) => {
          this.store.addPlanet(new Planet(p));
        });
      }

    });
  }

  send(msg: Message) {
    this.subject.next({type: msg.type, payload: msg.payload});
  }

  getMessages(): Observable<Message> {
    return this.subject.asObservable();
  }
}
