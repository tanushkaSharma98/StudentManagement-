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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StudentService } from './student.service';

@Controller('students')
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
  createStudent(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.studentService.createStudent(body, file);
  }

  
  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  
  @Get(':id')
  getStudentById(@Param('id') id: number) {
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
  ) {
    return this.studentService.updateStudent(id, body, file);
  }


  @Delete(':id')  
  deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
