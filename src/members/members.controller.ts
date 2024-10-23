import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { Memberdto } from './dto/member';
import { User as UserModel } from '@prisma/client';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Post()
  create(@Body() User:Memberdto) {
    return this.membersService.create(User);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() User:Memberdto) {
    return this.membersService.update(id, User);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.membersService.remove(id);
  }


}
