import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module'; 
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tanu1234',
      database: 'student_management',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule, 
  
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

     StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
