import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(type => Int, { nullable: true })
  @Min(0)
  skip = 0;

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(50)
  take = 25;
}
