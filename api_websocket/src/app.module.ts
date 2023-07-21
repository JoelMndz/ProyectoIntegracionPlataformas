import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PanelGateway } from './websocket/panel.gateway';
@Module({
  imports: [PanelGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
