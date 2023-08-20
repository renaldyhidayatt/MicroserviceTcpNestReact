import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@myexperiment/auth-guard';
import { UserModule } from '@myexperiment/infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {
  User,
  Role,
  Cart,
  Order,
  Slider,
  Category,
  Product,
} from '@myexperiment/domain';
import { RoleModule } from './role/role.module';
import { SlidersModule } from './sliders/sliders.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule as MyUserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { MidtransModule } from './midtrans/midtrans.module';
import { RajaongkirModule } from './rajaongkir/rajaongkir.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Cart, Product, Category, Order, Slider],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Adjust the path as needed
      renderPath: 'public',
    }),
    AuthModule,
    RoleModule,
    SlidersModule,
    CategoryModule,
    ProductModule,
    MyUserModule,
    UserModule,
    OrderModule,
    CartModule,
    MidtransModule,
    RajaongkirModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
