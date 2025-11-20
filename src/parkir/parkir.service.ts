import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { Parkir } from '@prisma/client';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { ParkirQueryDto } from './dto/parkir-query.dto';
import { contains } from 'class-validator';
import { totalmem } from 'os';

@Injectable()
export class ParkirService {
    private readonly TARIF= {
        roda2: {
            jamPertama: 3000,
            jamBerikutnya: 2000   
        },
        roda4: {
            jamPertama: 6000,
            jamBerikutnya: 4000
        },
    }

    constructor(private prisma: PrismaService) {}
        private hitungTotal(jenis: 'roda2' | 'roda4', durasi: number): number {
            const tarif = this.TARIF[jenis];        
            if (durasi <= 1 ) {
                return tarif.jamPertama;
            }
            return tarif.jamPertama + (durasi - 1) * tarif.jamBerikutnya;
        }
        async create(CreateParkirDto: CreateParkirDto){
            const jenis = CreateParkirDto.jenisKendaraan as 'roda2' | 'roda4';
            const durasi = CreateParkirDto.durasi;

            const total = this.hitungTotal(jenis, durasi);
            return this.prisma.parkir.create({
                data: {
                    platNomor: CreateParkirDto.platNomor,
                    jenisKendaraan: jenis,
                    durasi: durasi,
                    total: total,
                }
                    })
        }
    async findAll(queryDto: ParkirQueryDto) {
        const { page = 1 , limit = 10, search, jenis } = queryDto;

        const skip = (page - 1) * limit;
        const take = limit;

        const where: any = {};

        if(jenis){
            where.jenisKendaraan = jenis;
            }

            if (search){
                where.platNomor = {
                    contains: search,
                    mode: 'insensitive'
                };
            }

            const data = await this.prisma.parkir.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc'
                },
            });

            const totalItems = await this.prisma.parkir.count({ where })
            const totalPages = Math.ceil(totalItems / limit);
            return {
                data,
                meta: {
                    page,
                    limit,
                    totalItems,
                    totalPages,
                }
            }
}

    async findOne(id: number): Promise<Parkir> {
                const parkir = await this.prisma.parkir.findUnique({
                    where: { id }
                })
                if (!parkir) {
                    throw new NotFoundException('Data parkir tidak ditemukan');
                }
                return parkir;
    }
    async getTotalPendapatan() {
        const result = await this.prisma.parkir.aggregate({
            _sum: {
                total: true,
            },
        });
        return { total_pendapatan: result._sum.total || 0 };
    }
    async remove(id: number ) {
        await this.findOne(id);
        return this.prisma.parkir.delete({
            where: { id ,}
        })
    }
    async updateDurasi(id: number, updateParkirDto: UpdateParkirDto) {
        const durasi = updateParkirDto.durasi;
        const existingParkir = await this.findOne(id);

        const newTotal  = this.hitungTotal(existingParkir.jenisKendaraan as 'roda2' | 'roda4', durasi);
        return this.prisma.parkir.update({
            where: { id },
            data: {
                durasi: durasi,
                total: newTotal,
            },
        })
}  
}