import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteService } from './favorite.service';
import { GetUser } from 'src/@common/decorator/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('favorites')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get('/my')
  async getMyFavoritePosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @GetUser() user: User,
  ) {
    return this.favoriteService.getMyFavoritePosts(page, user);
  }

  @Post('/:id')
  toggleFavorite(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.favoriteService.toggleFavorite(id, user);
  }
}
