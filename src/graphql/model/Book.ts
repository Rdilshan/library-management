import { ObjectType, Field, Int } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
@ObjectType()
export class Book {

  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  Author: string;

  @Field()
  year: Date;
  
}
