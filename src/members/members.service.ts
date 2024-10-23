
import { Memberdto } from './dto/member';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


@Injectable()
export class MembersService {

  constructor(
    private readonly prisma: PrismaService,

  ) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async create(User: Memberdto) {
    try {
      return await this.prisma.user.create({
        data: {
          email: User.email,
          name: User.name
        }
      });
      
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
    
  }


  async findOne(id: number) {
    try {
      id = Number(id)
      const user = await this.prisma.user.findUnique({
        where: { id },
      })

      if ((await user).name == "") {
        throw new HttpException(
          'User not found',
          HttpStatus.NOT_FOUND, 
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, 
      );
    }

  }

  remove(id: number) {
    try {
      id = Number(id)
      const user = this.prisma.user.delete({
        where: { id },
      })

      if (!user) {
        throw new HttpException(
          'User not found',
          HttpStatus.NOT_FOUND, 
        );
      }

      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }


  async update(id: number, User: Memberdto) {
    try {

      id = Number(id)
      const updateuser = await this.prisma.user.update({
        where: { id },
        data: {
          email: User.email,
          name: User.name
        }
      })

      return updateuser;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }
}
