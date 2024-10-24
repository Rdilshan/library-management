import { ObjectType, Field, Int } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum Visible {
    yes = 'yes',
    no = 'no',
}

registerEnumType(Visible, {
  name: 'Visible', 
});
@ObjectType()

export class BorrowBook{
    @Field(() => Int)
    id: number;
  
    @Field()
    bookId: number;
  
    @Field()
    userId: number;

    @Field()
    bringDate: Date;

    @Field()
    endDate: Date;

    @Field(()=>Visible)
    finished: Visible;

}