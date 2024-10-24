import { ObjectType, Field, Int } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  Super = 'Super',
  manager = 'manager',
}

registerEnumType(Role, {
  name: 'Role', 
});


@ObjectType()
export class Admin {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: Role; // Role enum field
}
