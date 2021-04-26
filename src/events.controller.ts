import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('/events')
export class EventsController {
    @Get()
    findAll() {}
    @Get()
    findeOne() {}
    @Post()
    create() {}
    @Patch()
    upade() {}
    @Delete()
    remove() {}
}
