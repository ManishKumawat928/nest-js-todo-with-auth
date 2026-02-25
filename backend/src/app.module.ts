import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AcceptLanguageResolver, HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as path from "path";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../src/i18n'),
        watch: true
      }, resolvers: [
        new HeaderResolver(["x-custom-lang"]),
        AcceptLanguageResolver,
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "mystrongsecretkey",
      signOptions: { expiresIn: "1h" },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    TodoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
