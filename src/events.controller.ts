import { Body, HttpCode } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
    private events: Event[] = [];

    @Get()
    findAll() {
        return this.events;
    }
    @Get(':id')
    findeOne(@Param('id') id: number) {
        const event = this.events.find((ev) => ev.id === id);
        return event;
    }
    @Post()
    create(@Body() input: CreateEventDto) {
        const event = {
            ...input,
            when: new Date(input.when),
            id: this.events.length + 1,
        };
        this.events.push(event);
        return event;
    }

    @Patch('id')
    upade(@Param('id') id: number, @Body() input: UpdateEventDto) {
        const index = this.events.findIndex((ev) => ev.id === id);

        const updateEvent = {
            ...this.events[index],
            ...input,
            when: input.when ? new Date(input.when) : this.events[index].when,
        };

        //replace obj
        this.events[index] = updateEvent;
        return updateEvent;
    }

    @Delete('id')
    @HttpCode(204)
    remove(@Param('id') id : number) {
        const newEventsArray = this.events.filter(ev => ev.id !== id);
        this.events = newEventsArray;
    }
}
