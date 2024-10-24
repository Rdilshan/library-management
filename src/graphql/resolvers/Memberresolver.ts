import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import {Member} from "../model/Member"
import { PrismaService } from '../../prisma.service';



export
@Resolver()
class Memberresolver {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Member])
  async getMembers() {
    return this.prisma.user.findMany();
  }

  @Query(() => Member)
  async getMember(
    @Args('id', { type: () => Int }) id: number,
  ) {
    id = Number(id)
    return this.prisma.user.findFirst({
        where:{id}
    });
  }


  @Mutation(() => Member)
  async createMember(
    @Args('email') email: string,
    @Args('name') name: string,

  ) {
    return this.prisma.user.create({
      data: { email, name },
    });
  }

  @Mutation(() => Member)
  async UpdateMember(
    @Args('id', { type: () => Int }) id: number,
    @Args('email') email: string,
    @Args('name') name: string,
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: { email, name },
    });
  }

  @Mutation(() => Member)
  async DeleteMember(@Args('id', { type: () => Int }) id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }



}
