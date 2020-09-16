/**
 * Created by Jacob Xie on 8/29/2020.
 */
import { Equal } from "typeorm"
import * as utils from "../utils"

// db name
export const db = "gallery"

// table name
export const category = "category"
export const dashboard = "dashboard"
export const template = "template"
export const element = "element"
export const content = "content"
export const mark = "mark"
export const tag = "tag"
export const author = "author"

// column name
export const id = "id"
export const name = "name"
export const date = "date"
export const text = "text"
export const title = "title"
export const contents = "contents"
export const elements = "elements"
export const templates = "templates"
export const marks = "marks"
export const tags = "tags"

// relations column & misc
export const ids = "ids"
export const names = "names"
export const markCategory = `${ mark }.${ category }`
export const markName = `${ mark }.${ name }`
export const categoryName = `${ category }.${ name }`
export const tagCategory = `${ tag }.${ category }`
export const tagName = `${ tag }.${ name }`
export const contentId = `${ content }.${ id }`
export const contentElement = `${ content }.${ element }`
export const contentCategory = `${ content }.${ category }`
export const contentMark = `${ content }.${ mark }`
export const contentTags = `${ content }.${ tags }`
export const contentAuthor = `${ content }.${ author }`

export const dateFormat = "YYYYMMDDHHmmss"

// column enum
export enum ElementType {
  EmbedLink = "embedLink",
  Text = "text",
  TargetPrice = "targetPrice",
  Image = "image",
  FileList = "fileList",
  FileManager = "fileManager",
  EditableTable = "editableTable",
  Table = "table",
  Lines = "lines",
  Histogram = "histogram",
  Pie = "pie",
  Scatter = "scatter",
  Heatmap = "heatmap",
  Box = "box",
  Tree = "tree",
  TreeMap = "treeMap",
}

// joint column name
export const elementsContents = `${ elements }.${ contents }`
export const templatesElements = `${ templates }.${ elements }`
export const templatesElementsContents = `${ templates }.${ elements }.${ contents }`

// query filters
export const whereDashboardAndTemplateNameEqual = (dn: string, tn: string) =>
  ({ where: { name: Equal(dn), "templates.name": Equal(tn) } })

export const whereDashboardNameAndTemplateEqual = (dn: string, tn: string) =>
  ({ where: { "dashboard.name": Equal(dn), name: Equal(tn) } })

// express validator
export const queryIdCheck = utils.queryFieldCheck(id)
export const queryIdsCheck = utils.queryFieldCheck(ids)
export const queryNameCheck = utils.queryFieldCheck(name)
export const queryDashboardNameCheck = utils.queryFieldCheck("dashboardName")
export const queryTemplateNameCheck = utils.queryFieldCheck("templateName")
export const queryCategoryNameCheck = utils.queryFieldCheck("categoryName")
export const queryMarkNameCheck = utils.queryFieldCheck("markName")
export const queryTagNameCheck = utils.queryFieldCheck("tagName")
export const queryOptionalMarkNameCheck = utils.queryOptionalFieldCheck("markName")
export const queryOptionalTagNamesCheck = utils.queryOptionalFieldCheck(
  "tagNames",
  (v: string) => utils.regArrayLike.exec(v) !== null
)
export const queryOptionalPaginationCheck = utils.queryOptionalFieldCheck(
  "pagination",
  (v: string) => utils.regPagination.exec(v) !== null
)

export const bodyNameCheck = utils.bodyFieldCheck(name)
export const bodyOriginDashboardNameCheck = utils.bodyFieldCheck("originDashboardName")
export const bodyOriginTemplateNameCheck = utils.bodyFieldCheck("originTemplateName")
export const bodyTargetDashboardNameCheck = utils.bodyFieldCheck("targetDashboardName")
export const bodyTargetTemplateNameCheck = utils.bodyFieldCheck("targetTemplateName")