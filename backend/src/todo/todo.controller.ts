import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { PaginatedList } from 'src/common/common.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleInterceptor } from 'src/common/interceptor/common-interceptor';


@UseGuards(JwtAuthGuard)
@Controller('todo')

@Controller({
    path: 'todo',
    version: '1'
})
@ApiHeader({
    name: 'accept-language'
})

export class TodoController {
    constructor(private readonly todoService: TodoService) { }
    // create todo
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create')

    @Post('create')
    async createTodo(@Body() createTodoDto: CreateTodoDto) {
        return await this.todoService.createTodo(createTodoDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('findAll')
    async findAll(@Query() pagingParams: PaginatedList) {
        return await this.todoService.findAll(pagingParams)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('findById/:id')
    async findById(@Param("id") id: string) {
        return await this.todoService.findById(id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('updateTodo/:id')
    async updateTodo(@Param('id') id: string, @Body() createTodoDto: CreateTodoDto) {
        return await this.todoService.updateTodo(id, createTodoDto)

    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(RoleInterceptor)
    @Delete('deleteTodo/:id')
    async deleteTodo(@Param('id') id: string) {
        return await this.todoService.deleteTodo(id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('search')
    @ApiQuery({ name: 'search', required: false, type: String })
    async search(@Query('search') search: string) {
        return await this.todoService.search(search)
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('filter')
    @ApiQuery({ name: 'isCompleted', required: false, type: Boolean })

    async filter(@Query('isCompleted') isCompleted: boolean) {
        return await this.todoService.filter(isCompleted)
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(RoleInterceptor)
    @Get('stats')
    async getStats() {
        return await this.todoService.getStats()
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('updateStatus/:id')
    async updateStatus(@Param('id') id: string, @Body('isCompleted') isCompleted: boolean,
    ) {
        return await this.todoService.updateStatus(id, isCompleted)
    }

}
