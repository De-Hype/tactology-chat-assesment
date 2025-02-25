// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
// import { RoomModule } from './room/room.module';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './users/users.module';
// import { ChatModule } from './chat/chat.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
//       sortSchema: true,
//       playground: true,
//       subscriptions: {
//         'graphql-ws': true,
//         'subscriptions-transport-ws': true,
//       },
//       context: ({ req }) => ({ req }),
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],

//       type: 'postgres',
//       host: configService.get('DB_HOST', 'localhost'),
//       port: process.env.DB_PORT,
//       username: process.env.DB_USER,
//       password: configService.get('DB_PASSWORD', 'postgres'),
//       database: configService.get('DB_DATABASE', 'chat_app'),
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: configService.get('DB_SYNC', true),
//     }),
//     AuthModule,
//     UserModule,
//     ChatModule,
//     RoomModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './users/users.module';

console.log(process.env.PORT)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'db',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'yourpassword',
        database: process.env.DB_DATABASE || 'tactology-assessment',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.DB_SYNC === 'true' || false,
      }),
    }),
    AuthModule,
    UserModule,
    ChatModule,
    RoomModule,
  ],
})
export class AppModule {}
