import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { BookService } from './book.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  async viewBook(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.findById(id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Tạm thời trả file PDF trực tiếp
    const filePath = path.join(process.cwd(), book.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    return res.sendFile(filePath);
  }
}
