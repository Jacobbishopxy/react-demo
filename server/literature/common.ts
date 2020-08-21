/**
 * Created by Jacob Xie on 8/19/2020.
 */

import { Request, Response } from "express"
import { query, validationResult } from "express-validator"
import { Equal, In } from "typeorm"


export type QueryStr = string | undefined

// db name
export const article = "article"
export const category = "category"
export const author = "author"
export const tag = "tag"

// column name
export const tags = "tags"
export const name = "name"
export const articles = "articles"
export const date = "date"
export const id = "id"

// joint column name
export const articleId = `${ article }.${ id }`
export const articleCategory = `${ article }.${ category }`
export const articleAuthor = `${ article }.${ author }`
export const articleTags = `${ article }.${ tags }`
export const categoryName = `${ category }.${ name }`
export const categoryArticles = `${ category }.${ articles }`
export const tagName = `${ tag }.${ name }`
export const articlesAuthor = `${ articles }.${ author }`
export const articlesTags = `${ articles }.${ tags }`
export const articlesCategory = `${ articles }.${ category }`
export const tagsArticles = `${ tags }.${ articles }`
export const tagsAuthor = `${ tags }.${ author }`

// query filters
export const whereNameEqual = (n: string) =>
  ({ where: { name: Equal(n) } })

export const whereNamesIn = (n: string) => {
  const ns = n.split(",")
  return { where: { names: In(ns) } }
}

export const whereIdsIn = (ids: string) => {
  const idsArr = ids.split(",").map(i => +i)
  return { where: { ids: In(idsArr) } }
}

// misc
const regSkip = new RegExp("^\\((\\d+),")
const regTake = new RegExp(",(\\d+)\\)$")
const regPagination = new RegExp("^\\((\\d+),(\\d+)\\)$")

export const paginationSkip = (pagination: string) => {
  const s = regSkip.exec(pagination)
  if (s === null)
    return undefined
  return +s[1]
}

export const paginationTake = (pagination: string) => {
  const t = regTake.exec(pagination)
  if (t === null)
    return undefined
  return +t[1]
}

export const paginationGet = (pagination: QueryStr) => {
  let pg = {}
  if (pagination) {
    const s = paginationSkip(pagination)
    const t = paginationTake(pagination)
    if (s) pg = { ...pg, skip: s }
    if (t) pg = { ...pg, take: t }
  }
  return pg
}

export function expressErrorsBreak(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return true
  }
  return false
}

export const arrayGet = (arr: QueryStr) => {
  if (arr) return arr.split(",")
  return undefined
}


// express request checkers
export const queryIdCheck =
  query(id, `${ id } is required!`)
    .exists()

export const queryIdsCheck =
  query("ids", "ids is required!")
    .exists()

export const queryNameCheck =
  query(name, `${ name } is required!`)
    .exists()

export const queryOptionalPaginationCheck =
  query("pagination", "pagination should like (5,10), meaning skip 5 and take 10")
    .optional()
    .custom((p: string) => regPagination.exec(p) !== null)