import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { IBook } from './interface/book.interface';
@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  public async create(book: IBook) {
    console.log(book);
    const newBook = new this.bookModel(book);
    try {
      return await newBook.save();
    } catch (error) {
      console.error('Error saving book:', error);
      throw error;
    }
  }

  public async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  public async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  public async update(id: string, book?: Book): Promise<Book> {
    return await this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .exec();
  }

  public async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }
}
