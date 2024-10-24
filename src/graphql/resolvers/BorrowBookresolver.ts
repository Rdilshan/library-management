import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { PrismaService } from '../../prisma.service';
import { BorrowBook } from '../model/BorrowBook';

export
@Resolver()
class BorrowBookresolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [BorrowBook])
  async getBorrowBooks() {
    return this.prisma.borrowBook.findMany();
  }

  @Query(() => BorrowBook)
  async getborrowBook(@Args('id', { type: () => Int }) id: number) {
    id = Number(id);
    return this.prisma.borrowBook.findFirst({
      where: { id },
    });
  }

  @Query(() => [BorrowBook])
  async BringBookset() {
    return this.prisma.borrowBook.findMany({
      where: {
        finished: 'yes',
      },
    });
  }

  @Query(() => [BorrowBook])
  async BorrowBookset() {
    return this.prisma.borrowBook.findMany({
      where: {
        finished: 'no',
      },
    });
  }

  @Mutation(() => BorrowBook)
  async createBorrowBook(
    @Args('bookId') bookId: number,
    @Args('userId') userId: number,
    @Args('bringDate') bringDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.prisma.borrowBook.create({
      data: { bookId, userId, bringDate, endDate },
    });
  }

  @Mutation(() => BorrowBook)
  async UpdateBorrowBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('bookId') bookId: number,
    @Args('userId') userId: number,
    @Args('bringDate') bringDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return await this.prisma.borrowBook.update({
      where: { id },
      data: { bookId, userId, bringDate, endDate },
    });
  }

  @Mutation(() => BorrowBook)
  async DeleteBorrowBook(@Args('id', { type: () => Int }) id: number) {
    return await this.prisma.borrowBook.delete({
      where: { id },
    });
  }

  @Mutation(() => BorrowBook)
  async updateBringBook(@Args('id', { type: () => Int }) id: number) {
    id = Number(id);
    return await this.prisma.borrowBook.update({
      where: { id },
      data: {
        finished: 'yes',
      },
    });
  }
}
