import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  AppService,
  MessageProps,
  MessagePropsNew,
  ThemeProps,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('messages')
  findAllMessages() {
    return this.appService.findAllMessages();
  }

  @Get('themes')
  findAllThemes() {
    return this.appService.findAllThemes();
  }

  @Get('theme/:id')
  findTheme(@Param('id') id: number) {
    return this.appService.findTheme(+id);
  }

  @Post('message')
  createMessage(@Body() body: MessagePropsNew) {
    return this.appService.createMessage(body);
  }

  @Post('theme')
  createTheme(@Body() body: ThemeProps) {
    return this.appService.insertTheme(body);
  }

  @Patch(':id')
  updateTheme(@Param('id') id: number) {
    return this.appService.updateTheme(+id);
  }
}
