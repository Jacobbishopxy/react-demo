/**
 * Created by Jacob Xie on 8/14/2020.
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm"

import * as common from "../common"
import { Category } from "./Category"
import { Tag } from "./Tag"
import { Author } from "./Author"

@Entity({ name: common.article })
@Unique([common.category, common.date])
export class Article {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  /**
   * bi-directional
   */
  @ManyToOne(() => Category, category => category.articles, { nullable: false })
  category!: Category

  /**
   * bi-directional, tags creatable, nullable
   */
  @ManyToMany(() => Tag, tag => tag.articles, { cascade: true, nullable: true })
  @JoinTable()
  tags?: Tag[]

  /**
   * bi-directional, author creatable, nullable
   */
  @ManyToOne(() => Author, author => author.articles, { cascade: true, nullable: true })
  author!: Author

  @Column("timestamp", { nullable: false })
  date!: string

  @Column("text", { nullable: false })
  title!: string

  @Column("text", { nullable: false })
  text!: string

  @CreateDateColumn({ select: false })
  createdAt!: string

  @UpdateDateColumn({ select: false })
  updatedAt!: string

  @VersionColumn()
  version!: number
}
