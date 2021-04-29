import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { Event } from './events/event.entity';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ormConfig],
            expandVariables: true,
        }), //for use env
        TypeOrmModule.forRootAsync({
            useFactory:
                process.env.NODE_ENV !== 'production'
                    ? ormConfig
                    : ormConfigProd,
        }),

        EventsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
