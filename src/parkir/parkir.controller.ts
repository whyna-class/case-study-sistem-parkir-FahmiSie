import { Body, Controller, UsePipes, ValidationPipe, Post, Get, Param, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { ParkirQueryDto } from './dto/parkir-query.dto';

@Controller('parkir')
@UsePipes(new ValidationPipe({ transform: true }))
export class ParkirController {
    
constructor(private readonly parkirService: ParkirService) {}

@Post()
create(@Body() createParkirDto: CreateParkirDto) {
    return this.parkirService.create(createParkirDto);
}

@Get('total')
getTotalPendapatan(){
    return this.parkirService.getTotalPendapatan();
}   

@Get()
findAll(@Query() queryDto: ParkirQueryDto) {
    return this.parkirService.findAll(queryDto);
}

@Get(':id')

findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parkirService.findOne(id);
}

@Patch(':id')
updateDurasi(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParkirDto: UpdateParkirDto,
){
    return this.parkirService.updateDurasi(id,updateParkirDto);
}

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkirService.remove(id);
}
}
