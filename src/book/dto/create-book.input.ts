import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateBookInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  publishedDate: boolean;
}
