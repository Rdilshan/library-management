import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { BookDto } from './dto/book';
import { PrismaService } from '../prisma.service';
import { Prisma, Book } from '@prisma/client';


@Injectable()
export class BookdService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.book.findMany();
  }
  
  async create(book: BookDto) {
    try {

      return await this.prisma.book.create({
        data: {
          title: book.title,
          Author: book.Author,
          year: book.year
      }});

    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }


  findOne(id: number) {
    try {
      id = Number(id)
      const book = this.prisma.book.findUnique({
        where: { id },
      });

      if (!book) {
        throw new HttpException(
          'Book not found',
          HttpStatus.NOT_FOUND, // 404 Not Found
        );
      }

      return book;
      
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );

    }
  }

  async update(id: number, book: BookDto) {
   try {
    id = Number(id)
    const updateuser = await this.prisma.book.update({
      where: { id },
      data: {
        title: book.title,
        Author: book.Author,
        year: book.year
      },
    })
    return updateuser;
   } catch (error) {
    throw new HttpException(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
    );
   }
  }

  async remove(id: number) {
    try {
      id = Number(id)
      return await this.prisma.book.delete({
        where: { id },
      })
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }



}
