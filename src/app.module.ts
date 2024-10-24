import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';

import { Adminresolver } from './graphql/resolvers/Adminresolver';
import { Bookresolver } from "./graphql/resolvers/Bookresolver";
import { Memberresolver } from './graphql/resolvers/Memberresolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/schema.gql',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [],
  providers: [PrismaService, Adminresolver,Bookresolver,Memberresolver],
})
export class AppModule {}
