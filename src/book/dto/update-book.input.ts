import { InputType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
// import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateBookInput extends CreateBookInput {}
