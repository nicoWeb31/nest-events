import { Body, HttpCode, ValidationPipe } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repo: Repository<Event>,
    ) {}

    @Get()
    async findAll() {
        return await this.repo.find();
    }
    @Get(':id')
    async findeOne(@Param('id') id: number) {
        return await this.repo.findOne(id);
    }

    //practice
    @Get('/practice')
    async practice() {
        return await this.repo.find({
            select: ['id', 'description', 'date'],
            where: [
                { id: MoreThan(3), date: new Date('2021-12-12T13:00:00') },
                { description: Like('%meet%') },
            ],
            take: 2,
            order: {
                id: 'DESC',
            },
        });
    }

    @Post()
    async create(
        @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
    ) {
        // const event = {
        //     ...input,
        //     when: new Date(input.when),
        //     id: this.events.length + 1,
        // };
        // this.events.push(event);
        // return event;

        return await this.repo.save({
            ...input,
            when: new Date(input.date),
        });
    }

    @Patch('id')
    async upade(
        @Param('id') id: number,
        @Body(new ValidationPipe({ groups: ['upade'] })) input: UpdateEventDto,
    ) {
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
        return await this.repo.save({
            ...event,
            ...input,
            when: input.date ? new Date(input.date) : event.date,
        });
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
