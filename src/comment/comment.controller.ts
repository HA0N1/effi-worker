import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:taskId')
  async getComments(@Param('taskId') taskId: number) {
    return await this.commentService.findAll(taskId);
  }

  @Post('/:taskId')
  async createComment(
    @Param('taskId') taskId: number,
    @Body() commentDto: CommentDto,
    @UserInfo() user: User,
  ) {
    const comment = await this.commentService.create(
      taskId,
      commentDto,
      user.id,
    );

    if (comment) {
      return { message: '댓글 생성 완료', comment };
    }
  }

  @Patch('/:commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() commentDto: CommentDto,
    @UserInfo() user: User,
  ) {
    const comment = await this.commentService.update(
      commentId,
      commentDto,
      user.id,
    );

    return { message: '댓글 수정 완료', comment };
  }

  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @UserInfo() user: User,
  ) {
    await this.commentService.delete(commentId, user.id);

    return { message: '댓글 삭제 완료' };
  }
}
