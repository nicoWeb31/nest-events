import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Event } from './events/event.entity';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        ConfigModule.forRoot(),//for use env 
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_BASE,
            entities: [Event],
            synchronize: true,
        }),

        EventsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
