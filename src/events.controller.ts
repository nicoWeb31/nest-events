import { Body, HttpCode } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repo: Repository<Event>)
        
        {}


    @Get()
    async findAll() {
        return await this.repo.find();
    }
    @Get(':id')
    async findeOne(@Param('id') id: number) {
        return await this.repo.findOne(id);
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        // const event = {
        //     ...input,
        //     when: new Date(input.when),
        //     id: this.events.length + 1,
        // };
        // this.events.push(event);
        // return event;

        return await this.repo.save({
            ...input,
            when: new Date(input.when)
        });
    }

    @Patch('id')
    async upade(@Param('id') id: number, @Body() input: UpdateEventDto) {
        // const index = this.events.findIndex((ev) => ev.id === id);

        // const updateEvent = {
        //     ...this.events[index],
        //     ...input,
        //     when: input.when ? new Date(input.when) : this.events[index].when,
        // };

        // //replace obj
        // this.events[index] = updateEvent;
        // return updateEvent;

        const event = await this.repo.findOne(id);
        return await this.repo.save({...event, ...input,when: input.when ? new Date(input.when) : event.when,})
    }

    @Delete('id')
    @HttpCode(204)
    async remove(@Param('id') id: number) {
        // const newEventsArray = this.events.filter((ev) => ev.id !== id);
        // this.events = newEventsArray;
        const event = await this.repo.findOne(id);

        await this.repo.remove(event);

    }
}
