import { Field, InputType } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewDishDataInput {
  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  imgUrl: string;

  @Field()
  price: number;
}
