import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './entities/book.entity';
@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  public async create(book: Book): Promise<Book> {
    const newBook = new this.bookModel(book);
    console.log(Book.name);
    console.log(newBook);
    return newBook.save();
  }

  public async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  public async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  public async update(id: string, book: Book): Promise<Book> {
    return await this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .exec();
  }

  public async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }
}
