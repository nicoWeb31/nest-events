import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto {
    @IsString()
    @Length(5,255,{message : 'The name length is wrong'})
    name: string;
    description: string;
    @IsDateString()
    date: string;
    @Length(5,255,{groups: ['create']})
    @Length(5,15,{groups: ['update']})

    adress: string;
}
