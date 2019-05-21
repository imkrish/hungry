import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Restaurant {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  imgUrl: string;

  @Field()
  creationDate: number;
}
