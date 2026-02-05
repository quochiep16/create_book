import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  create(data: CreateBookDto) {
    const book = this.bookRepo.create(data);
    return this.bookRepo.save(book);
  }

  findById(id: string) {
    return this.bookRepo.findOne({
      where: { id, isPublic: true },
    });
  }
}
