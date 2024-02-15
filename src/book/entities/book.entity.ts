import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@ObjectType()
@Schema()
export class Book {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  publishedDate: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
