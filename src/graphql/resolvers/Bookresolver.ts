import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Book } from '../model/Book';
import { PrismaService } from '../../prisma.service';
import { UseGuards } from '@nestjs/common';
import {AuthGuardManager} from "../../Middleware/AuthGuardManager";


export
@Resolver()
@UseGuards(AuthGuardManager)
class Bookresolver {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Book])
  async getBooks() {
    return this.prisma.book.findMany();
  }

  @Query(() => Book)
  async getBook(
    @Args('id', { type: () => Int }) id: number,
  ) {
    id = Number(id)
    return this.prisma.book.findFirst({
        where:{id}
    });
  }

  @Mutation(() => Book)
  async createBook(
    @Args('title') title: string,
    @Args('Author') Author: string,
    @Args('year') year: Date,
  ) {
    return this.prisma.book.create({
      data: { title, Author, year },
    });
  }

  @Mutation(() => Book)
  async UpdateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('Author') Author: string,
    @Args('year') year: Date,
  ) {
    return await this.prisma.book.update({
      where: { id },
      data: { title, Author,year },
    });
  }

  @Mutation(() => Book)
  async DeleteBook(@Args('id', { type: () => Int }) id: number) {
    return await this.prisma.book.delete({
      where: { id },
    });
  }

}
