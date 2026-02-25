import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({ example: 'Buy groceries', description: 'The title of the todo item' })
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    description: string

    @ApiProperty()
    isCompleted: boolean
}