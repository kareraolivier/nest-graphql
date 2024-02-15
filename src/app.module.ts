// import { Module } from '@nestjs/common';
// import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { BookModule } from './book/book.module';
// import mongodbConfig from './config/mongodb.config';
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       load: [mongodbConfig],
//       isGlobal: true,
//     }),
//     NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
//         installSubscriptionHandlers: true,
//         sortSchema: true,
//         playground: true,
//         debug: configService.get<boolean>('DEBUG'),
//         uploads: false,
//       }),
//     }),
//     MongooseModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get('DATABASE_URL'),
//       }),
//     }),
//     BookModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ApolloServerPlugin } from '@apollo/server';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault() as unknown as ApolloServerPlugin<any>,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // CHECK IF YOU GET WHAT IS EXPECTED
        // console.log('ENV VAR', configService.get('DATABASE_URL'));

        const options: MongooseModuleOptions = {
          uri: configService.get<string>('DATABASE_URL'),
        };

        return options;
      },
    }),
    ConfigModule.forRoot({
      cache: true,
    }),
    BookModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
