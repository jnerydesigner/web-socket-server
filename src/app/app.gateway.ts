import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway({
  cors: '*',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private users = {};

  constructor(private readonly appService: AppService) {
    this.logger = new Logger(AppGateway.name);
  }

  @WebSocketServer() server: Server;
  private logger: Logger;

  async handleDisconnect(client: Socket) {
    this.logger.log(`Disconnect socket: ${client.id}`);
    const deleted = await this.appService.deleteAllMessages();

    console.log(deleted);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.users[client.id] = { name: 'Jander', email: 'jander@email.com' };
  }

  afterInit(server: Server) {
    this.logger.log(`Socket Init`);
  }

  @SubscribeMessage('join-room')
  async joinRoomChat(client: Socket, payload: any): Promise<void> {
    // const theme = await this.appService.findTheme(payload);
    // const createMessage = await this.appService.createMessage(payload);
    // client.broadcast.emit('received-message', payload);
    console.log(payload);
    console.log(client.id);

    client.join(client.id);
  }

  @SubscribeMessage('create-message')
  async handleCreateMessage(client: Socket, payload: any): Promise<void> {
    const payloadNew = {
      room: 'default',
      ...payload,
    };

    const createMessage = await this.appService.createMessage(payloadNew);
    client.emit('received-message', createMessage);
  }

  @SubscribeMessage('message-room')
  async handleMessageChatRoom(client: Socket, payload: any): Promise<void> {
    const messageGeneral = await this.appService.findAllMessages();
    client.broadcast.emit('message-room', messageGeneral);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log(payload);
    this.server.emit('msgToClient', payload, client.id);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  @SubscribeMessage('changeTheme')
  async handleChangeTheme(client: Socket, payload: string) {
    await this.appService.callTheme();
    const theme = await this.appService.findThemeProvider();
    console.log(theme);
    this.server.emit('changeThemeProvider', theme);
  }
}
