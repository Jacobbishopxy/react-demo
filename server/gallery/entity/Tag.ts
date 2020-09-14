/**
 * Created by Jacob Xie on 9/1/2020.
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Column,
  JoinTable
} from "typeorm"
import * as common from "../common"
import { Category } from "./Category"
import { Content } from "./Content"

@Entity({ name: common.tag })
export class Tag {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column("varchar")
  name!: string

  @Column("text", { nullable: true })
  description?: string

  @ManyToOne(() => Category, c => c.tags)
  category!: Category

  @ManyToMany(() => Content, c => c.tags)
  @JoinTable()
  contents!: Content[]
}
