import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Admin, Role } from '../model/admin';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import {AuthGuard} from "../../Middleware/AuthGuard";

export
@Resolver()

class Adminresolver {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Query(() => [Admin])
  @UseGuards(AuthGuard)
  async getAdmins() {
    return this.prisma.admin.findMany();
  }

  @Query(() => Admin)
  @UseGuards(AuthGuard)
  async getAdmin(@Args('id', { type: () => Int }) id: number) {
    id = Number(id);
    return this.prisma.admin.findUnique({ where: { id } });
  }

  @Query(()=>String)
  async LoginAdmin(@Args('email') email: string, @Args('password') password: string) {
    const checkadmin = this.prisma.admin.findFirst({
      where: { email },
    });
    if ((await checkadmin).password === '') {
      throw new Error('Admin not found');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      (await checkadmin).password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.sign({
      email: (await checkadmin).email,
      role: (await checkadmin).role,
    });

    return  token ;
  }

  @Mutation(() => Admin)
  @UseGuards(AuthGuard)
  async createAdmin(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.prisma.admin.create({
      data: { name, email, username, password: hashedPassword },
    });
  }

  @Mutation(() => Admin)
  @UseGuards(AuthGuard)
  async UpdateAdmin(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('username') username: string,
  ) {
    return await this.prisma.admin.update({
      where: { id },
      data: { name, email, username },
    });
  }

  @Mutation(() => Admin)
  @UseGuards(AuthGuard)
  async DeleteAdmin(@Args('id', { type: () => Int }) id: number) {
    return await this.prisma.admin.delete({
      where: { id },
    });
  }
}
