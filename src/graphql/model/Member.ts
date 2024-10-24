
import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Member{
    
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

}