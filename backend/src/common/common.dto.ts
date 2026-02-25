import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginatedList {
    @ApiPropertyOptional()
    page: number;

    @ApiPropertyOptional()
    limit: number
}