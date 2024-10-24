import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Admin } from '../model/admin';
import { PrismaService } from '../../prisma.service';

export
@Resolver()
class Adminresolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Admin])
  async getAdmins() {
    return this.prisma.admin.findMany();
  }
  
  @Query(() => Admin)
  async getAdmin(@Args('id', { type: () => Int }) id: number) {
    id=Number(id)
    return this.prisma.admin.findUnique({ where: { id } });
  }




  
}
