import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/todo.schema';
import { TranslationService } from 'src/service/translation.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    JwtModule.register({
      secret: 'supersecretkey', // ⭐ ADD THIS
      signOptions: { expiresIn: '7d' },
    })],

  controllers: [TodoController],
  providers: [TodoService, TranslationService]
})
export class TodoModule { }
