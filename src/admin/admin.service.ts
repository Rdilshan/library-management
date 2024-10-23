import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Admin } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { AdminDTO } from './admindto/admindto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlladmin() {
    const admin = await this.prisma.admin.findMany();
    return admin;
  }

  // async createSuperAdmin(admin: Admin){

  //   const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
  //   const hashedPassword = await bcrypt.hash('123456', saltRounds);

  //   const newadmin = await this.prisma.admin.create({
  //     data: {
  //       username:"admin",
  //       email: "Admin@example.com",
  //       password: hashedPassword,
  //       name: "Admin",
  //       role: "Super",
  //     }

  //   })
  //   return newadmin;
  // }

  async createAdmin(admin: AdminDTO) {
    try {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(admin.password, saltRounds);

      const newadmin = await this.prisma.admin.create({
        data: {
          username: admin.username,
          email: admin.email,
          password: hashedPassword,
          name: admin.name,
          role: 'manager',
        },
      });
      return newadmin;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  deleteAdmin(id: number) {
    try {
      return this.prisma.admin.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  updateAdmin(id: number, data: Prisma.AdminUpdateInput) {
    try {
      return this.prisma.admin.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  
}
