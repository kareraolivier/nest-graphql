import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Book {
  // @Field(() => String)
  // @Prop()
  // _id?: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  author: string;

  @Field()
  @Prop()
  publishedDate: boolean;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
