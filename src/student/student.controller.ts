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
import { JwtPayload } from '../auth/types/jwt-payload.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

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
    @Body() body: CreateStudentDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.studentService.createStudent(body, file);
  }

  @Get()
  getAllStudents(@GetUser() user: JwtPayload) {
    return this.studentService.getAllStudents();
  }

  @Get('paginated')
  getPaginatedStudents(
    @GetUser() user: JwtPayload,
    @Query('page') page = '1',
    @Query('name') name?: string,
    @Query('branch') branch?: string,
  ) {
    const pageNumber = Number(page) || 1;
    const limit = 5;
    return this.studentService.getStudentsWithPagination(pageNumber, limit, name, branch);
  }

  @Get('filter')
  filterStudents(
    @GetUser() user: JwtPayload,
    @Query('name') name?: string,
    @Query('branch') branch?: string,
  ) {
    return this.studentService.filterStudents(name, branch);
  }

  @Get(':id')
  getStudentById(@GetUser() user: JwtPayload, @Param('id') id: number) {
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
    @GetUser() user: JwtPayload,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, body, file);
  }

  @Delete(':id')
  deleteStudent(@GetUser() user: JwtPayload, @Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
