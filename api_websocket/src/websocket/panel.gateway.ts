import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class PanelGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('SERVER WEB SOCKET INICIADO')
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('NUEVO CLIENTE CONECTADO!');
  }

  handleDisconnect(client: any) {
    console.log('CLIENTE DESCONECTADO!')
  }


  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message')
  handleIncommingMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;
    console.log(payload)
    this.server.to(`room_${room}`).emit('new_message', message);
  }

  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room: string) {
    console.log(`chao room_${room}`)
    client.leave(`room_${room}`);
  }
}