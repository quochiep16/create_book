import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async create(data: Partial<Book>) {
    const book = this.bookRepo.create(data);
    return this.bookRepo.save(book);
  }

  async findById(id: string) {
    return this.bookRepo.findOne({
      where: { id },
    });
  }
}
