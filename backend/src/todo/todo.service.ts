import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schema/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TranslationService } from 'src/service/translation.service';
import { paginationResponse, response } from 'src/utils/response.util';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>, private readonly translationService: TranslationService) { }

    async createTodo(createTodoDto: CreateTodoDto) {
        try {
            const toDo = await this.todoModel.create(createTodoDto);
            return response(HttpStatus.CREATED, await this.translationService.translate('SUCCESS'), toDo)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)
        }
    }

    async findAll(pagingParams) {
        try {
            const page = pagingParams.page || 1;
            const limit = pagingParams.limit || 10;
            const skip = (page - 1) * limit;

            const todos = await this.todoModel.find({ isDeleted: false }).sort({ createdAt: -1 }).skip(skip).limit(limit)
            const total = await this.todoModel.countDocuments({ isDeleted: false }).exec();
            return paginationResponse(HttpStatus.OK, await this.translationService.translate('SUCCESS'), page, limit, total, todos)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)
        }
    }

    async findById(id: string) {
        try {
            const todos = await this.todoModel.findById(id).lean()
            return response(HttpStatus.OK, await this.translationService.translate('SUCCESS'), todos)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)
        }
    }

    async updateTodo(id: string, creatTodoDto: CreateTodoDto) {
        try {
            const updatedTodo = await this.todoModel.findByIdAndUpdate(id, creatTodoDto, { new: true, runValidators: true })
            if (!updatedTodo) {
                throw new BadRequestException(await this.translationService.translate('NOT_FOUND'))
            }
            return response(HttpStatus.OK, await this.translationService.translate('SUCCESS'), updatedTodo)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)

        }
    }

    async deleteTodo(id: string) {
        try {
            const deletedTodo = await this.todoModel.findOne({ _id: id })
            if (!deletedTodo) {
                throw new BadRequestException(await this.translationService.translate('NOT_FOUND'))
            }
            deletedTodo.isDeleted = true;
            await deletedTodo.save()
            return response(HttpStatus.OK, await this.translationService.translate('SUCCESS'))
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)

        }
    }

    async search(search: string) {
        try {
            const todos = await this.todoModel.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ],
                isDeleted: false
            })
            return response(HttpStatus.OK, await this.translationService.translate('SUCCESS'), todos)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)

        }
    }

    async filter(isCompleted: boolean) {
        try {
            const filter: any = { isDeleted: false }
            if (isCompleted !== undefined) {
                filter.isCompleted = isCompleted
            }
            const todos = await this.todoModel.find(filter)
            return response(HttpStatus.OK, await this.translationService.translate('SUCCESS'), todos)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)

        }
    }

    async getStats() {
        const total = await this.todoModel.countDocuments({ isDeleted: false });

        const completed = await this.todoModel.countDocuments({
            isDeleted: false,
            isCompleted: true
        });

        const pending = await this.todoModel.countDocuments({
            isDeleted: false,
            isCompleted: false
        });

        return {
            total,
            completed,
            pending
        };
    }

    async updateStatus(id: string, isCompleted: boolean) {
        try {
            const updatedStatus = await this.todoModel.findByIdAndUpdate(id, { isCompleted }, { new: true, runValidators: true })
            if (!updatedStatus) {
                throw new BadRequestException(await this.translationService.translate('NOT_FOUND'))
            }
            return response(HttpStatus.OK, await this.translationService.translate('SUCCESS'), updatedStatus)
        } catch (error) {
            throw response(HttpStatus.INTERNAL_SERVER_ERROR, await this.translationService.translate("INTERNAL_SERVER_ERROR"), error)
        }
    }
}

