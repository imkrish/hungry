import { Field, InputType } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewRestaurantDataInput {
  @Field()
  @MaxLength(50)
  title: string;
}
