import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BookService } from './book.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  findOne(@Args('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput): Promise<Book> {
    return this.bookService.create(input);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input?: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.update(id, input);
  }

  @Mutation(() => Book)
  async deleteBook(@Args('id', { type: () => ID }) id: string): Promise<Book> {
    return this.bookService.delete(id);
  }
}
