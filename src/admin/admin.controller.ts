import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin as AdminModel } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAllUsers() {
    return this.adminService.getAlladmin();
  }

  // @Post()
  // async createAdmin(@Body() admin: AdminModel) {
  //   return this.adminService.createSuperAdmin(admin);
  // }

  @Post()
  async createAdmin(@Body() admin: AdminModel) {
    return this.adminService.createAdmin(admin);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: number) {
    return this.adminService.deleteAdmin(id);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: number, @Body() admin: AdminModel) {
    return this.adminService.updateAdmin(id, admin);
  }



  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.adminService.login(email, password);
  }

  
}


