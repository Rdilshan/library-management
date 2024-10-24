import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BorrowBookDto } from './dto/BorrowBook';
import { PrismaService } from '../prisma.service';
import { Prisma, BorrowBook } from '@prisma/client';

@Injectable()
export class BorrowBookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(BorrowBook: BorrowBookDto) {
    try {
      return await this.prisma.borrowBook.create({
        data: BorrowBook,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  async findAll() {
    return await this.prisma.borrowBook.findMany({});
  }

  async findOne(id: number) {
    try {
      id = Number(id);
      const bookborrow = await this.prisma.borrowBook.findUnique({
        where: { id },
      });
      if (!bookborrow) {
        throw new HttpException(
          'Book not found',
          HttpStatus.NOT_FOUND, // 404 Not Found
        );
      }
      return bookborrow;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  async update(id: number, BorrowBook: BorrowBookDto) {
    try {
      id = Number(id);
      return await this.prisma.borrowBook.update({
        where: { id },
        data: BorrowBook,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  async remove(id: number) {
    try {
      id = Number(id);
      return await this.prisma.borrowBook.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  async finished(id: number) {
    try {
      id = Number(id)

      return await this.prisma.borrowBook.update({
        where: { id },
        data: {
          finished: 'yes'
        }
      })
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }


  getFinished (){
    try {
      return this.prisma.borrowBook.findMany({
        where: {
          finished: 'yes'
        }
      })
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }
  borrowbookcount(){
    try {
      return this.prisma.borrowBook.findMany({
        where: {
          finished: 'no'
        }
      })
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }
}
