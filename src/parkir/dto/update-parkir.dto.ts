import { IsInt, Min } from "class-validator";

export class UpdateParkirDto {
    @IsInt()
    @Min(1)
    durasi: number;
}