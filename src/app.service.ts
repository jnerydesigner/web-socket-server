import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './data/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  private logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(AppService.name);
  }

  async findTheme(id: number) {
    const theme = await this.prismaService.theme.findFirst({
      where: {
        id,
      },
    });

    return theme.theme;
  }

  async findThemeProvider() {
    const theme = await this.prismaService.theme.findFirst({
      where: {
        id: 1,
      },
    });

    return theme.theme;
  }

  async findAllMessages() {
    return this.prismaService.message.findMany({
      orderBy: {
        registration_date: 'asc',
      },
    });
  }

  async findAllThemes() {
    return this.prismaService.theme.findMany();
  }

  async createMessage(message: MessagePropsNew) {
    const props: MessageProps = {
      id: message.id,
      author: message.author,
      message: message.message,
      room: message.room,
    };
    const response = await this.prismaService.message.create({
      data: props,
    });

    return response;
  }

  async insertTheme({ theme }: ThemeProps): Promise<any> {
    return await this.prismaService.theme.create({
      data: {
        theme,
      },
    });
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async updateTheme(id: number): Promise<any> {
    return null;
  }

  async callTheme() {
    const theme = await this.prismaService.theme.findFirst({
      where: {
        id: 1,
      },
    });

    if (theme.theme === 'light') {
      const updateTheme = await this.prismaService.theme.update({
        where: {
          id: 1,
        },
        data: {
          theme: 'dark',
        },
      });
    } else {
      const updateTheme = await this.prismaService.theme.update({
        where: {
          id: 1,
        },
        data: {
          theme: 'light',
        },
      });
    }

    const themeSearch = await this.prismaService.theme.findFirst({
      where: {
        id: 1,
      },
    });

    console.log(themeSearch.theme);
  }

  async deleteAllMessages() {
    return this.prismaService.message.deleteMany();
  }
}

export interface MessageProps {
  id?: string;
  author: string;
  message: string;
  registration_date?: Date;
  room: string;
}

export interface ThemeProps {
  id?: string;
  theme: string;
}

export interface MessagePropsNew {
  id: string | null;
  room: string;
  author: string;
  message: string;
  time?: Date;
}
