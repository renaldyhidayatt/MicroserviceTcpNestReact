import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Category, Product, Role, User } from '@myexperiment/domain';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@myexperiment/auth-guard';
import { UserModule } from '@myexperiment/infrastructure';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Cart, Product, Category],
      synchronize: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/upload/userprofile',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
