import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {Adminresolver} from "./graphql/resolvers/Adminresolver";
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:"./src/schema.gql"
    }),
    
  ],
  controllers: [],
  providers: [PrismaService,Adminresolver],
})

export class AppModule  {}
