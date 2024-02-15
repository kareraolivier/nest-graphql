import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  providers: [BookResolver, BookService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
})
export class BookModule {}
