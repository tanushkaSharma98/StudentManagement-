import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student) private studentModel: typeof Student) {} //access db

  async createStudent(data: any, file: Express.Multer.File) {
    const photoPath = file ? `/uploads/${file.filename}` : null;
    return await this.studentModel.create({ ...data, photo: photoPath });
  }

  
  async getAllStudents() {
    return await this.studentModel.findAll();
  }

  
  async getStudentById(id: number) {
    return await this.studentModel.findOne({ where: { student_id: id } });
  }

  
  async updateStudent(id: number, data: any, file: Express.Multer.File) {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    
    if (file) {
      if (student.photo) {
        const oldPhotoPath = path.join(__dirname, '..', '..', student.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath); 
        }
      }
      data.photo = `/uploads/${file.filename}`; 
    }

    await student.update(data);
    return student;
  }

  
  async deleteStudent(id: number) {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    
    if (student.photo) {
      const photoPath = path.join(__dirname, '..', '..', student.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await student.destroy(); 

    return { message: 'Student deleted successfully' };
  }
}
