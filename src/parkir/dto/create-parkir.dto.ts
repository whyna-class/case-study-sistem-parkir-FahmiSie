import { Type } from 'class-transformer';
import { IsNotEmpty, IsIn, IsInt, Min, IsString } from 'class-validator';

export class CreateParkirDto {
  @IsString()
  @IsNotEmpty({ message: 'plat_nomor tidak boleh kosong.' })
  platNomor: string;


  @IsString()
  @IsIn(['roda2', 'roda4'], { message: 'jenis_kendaraan hanya boleh "roda2" atau "roda4".' }) 
  jenisKendaraan: 'roda2' | 'roda4';

  @Type(() => Number )
  @IsInt({ message: 'durasi harus berupa angka bulat.' })
  @Min(1, { message: 'durasi harus lebih dari 0.' })
  durasi: number;
}