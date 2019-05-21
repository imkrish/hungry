import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Restaurant {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  creationDate: number;

  @Field()
  done: boolean;
}
