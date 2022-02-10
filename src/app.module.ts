import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CollectionModule } from './collection/collection.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // 加载自定义配置文件
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // 配置TypeOrm
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password } =
          configService.get('database');
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database: 'bookmark_online',
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
