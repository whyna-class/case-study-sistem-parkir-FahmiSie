import { IsInt, IsOptional, IsString, Min, IsIn } from "class-validator";
import { Type } from 'class-transformer'

export class ParkirQueryDto {
    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsIn(['roda2', 'roda4'])
    jenis?: 'roda2' | 'roda4';
}
