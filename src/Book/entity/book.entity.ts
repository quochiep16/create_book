import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('books')
export class Book {
  /**
   * ID dùng cho link public
   * /book/:id
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Tên file gốc người dùng upload
   * vd: hop-dong.pdf
   */
  @Column({ length: 255 })
  originalName: string;

  /**
   * Tên file lưu trong server
   * vd: 8f3a2c9e.pdf
   */
  @Column({ length: 255, unique: true })
  fileName: string;

  /**
   * Đường dẫn file
   * vd: uploads/8f3a2c9e.pdf
   */
  @Column({ length: 500 })
  filePath: string;

  /**
   * Dung lượng file (byte)
   */
  @Column('bigint')
  size: number;

  /**
   * Số trang PDF
   * (optional – có thể update sau khi parse)
   */
  @Column({ type: 'int', nullable: true })
  pageCount?: number;

  /**
   * Có cho public không
   */
  @Column({ type: 'boolean', default: true })
  isPublic: boolean;

  /**
   * Link hết hạn (nếu cần)
   */
  @Index()
  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  /**
   * Ngày tạo
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Ngày update (nếu chỉnh metadata)
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
