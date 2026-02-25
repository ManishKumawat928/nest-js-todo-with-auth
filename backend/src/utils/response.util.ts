import { HttpStatus } from "@nestjs/common";

export const response = (HttpCode: HttpStatus, message: string, data?: any) => {
    return {
        statusCode: HttpCode,
        message,
        data
    }
}
export const paginationResponse = (HttpCode: HttpStatus, message: string, page: number, limit: number, total: number, data?: any) => {
    return {
        statusCode: HttpCode,
        message,
        page,
        limit,
        total,
        data
    }
}