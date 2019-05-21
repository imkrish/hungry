import { Field, InputType } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewRestaurantDataInput {
  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  imgUrl: string;
}
