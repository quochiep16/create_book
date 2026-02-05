import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { BookService } from './book.service';
import { pdfStorage } from '../upload/multer.config';
import * as path from 'path';
import * as fs from 'fs';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 📤 Upload PDF
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: pdfStorage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(new Error('Only PDF allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const book = await this.bookService.create({
      originalName: file.originalname,
      fileName: file.filename,
      filePath: `uploads/${file.filename}`,
      size: file.size,
    });

    return {
      id: book.id,
      link: `http://localhost:3000/book/${book.id}`,
    };
  }

  // 📖 View PDF
  @Get(':id')
  async view(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.findById(id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    const filePath = path.join(process.cwd(), book.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File missing');
    }

    res.setHeader('Content-Type', 'application/pdf');
    return res.sendFile(filePath);
  }
}
