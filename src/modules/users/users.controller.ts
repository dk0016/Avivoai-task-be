import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSearchParams } from 'src/interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create() {
    return await this.userService.create();
  }

  @Get()
  async find(@Query() query: UserSearchParams, @Res() res: Response | any) {
    const result = await this.userService.getUsers({ query });
    return res.status(200).send(result);
  }
}
