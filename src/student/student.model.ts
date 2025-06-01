import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../auth/user.model';

@Table({
  tableName: 'students',
  timestamps: false,
})
export class Student extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  student_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.DATE })
  dob: Date;

  @Column({ type: DataType.STRING })
  branch: string;

  @Column({ type: DataType.INTEGER })
  semester: number;

  @Column({ type: DataType.TEXT })
  photo: string; 
}
