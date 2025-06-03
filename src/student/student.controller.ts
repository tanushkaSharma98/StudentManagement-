import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StudentService } from './student.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  createStudent(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @GetUser() user: any,
  ) {
    return this.studentService.createStudent(body, file);
  }

  @Get()
  getAllStudents(@GetUser() user: any) {
    return this.studentService.getAllStudents();
  }

  @Get('paginated')
  getPaginatedStudents(
    @Query('page') page = '1',
    @GetUser() user: any,
  ) {
    const pageNumber = Number(page) || 1;
    const limit = 5; 
    return this.studentService.getStudentsWithPagination(pageNumber, limit);
  }

  
  @Get('filter')
  filterStudents(
    @Query('name') name: string,
    @Query('branch') branch: string,
    @GetUser() user: any,
  ) {
    return this.studentService.filterStudents(name, branch);
  }

  @Get(':id')
  getStudentById(@Param('id') id: number, @GetUser() user: any) {
    return this.studentService.getStudentById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  updateStudent(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @GetUser() user: any,
  ) {
    return this.studentService.updateStudent(id, body, file);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
