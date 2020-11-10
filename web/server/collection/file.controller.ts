/**
 * Created by Jacob Xie on 10/3/2020.
 */

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Bind,
  Query,
  ParseBoolPipe,
  ParseIntPipe
} from '@nestjs/common'
import {FileInterceptor} from "@nestjs/platform-express"

import {Workbook, Worksheet} from 'exceljs'
import moment from 'moment'
import axios from "axios"
import FormData from "form-data"


import {serverUrl} from "../config"

interface Spreadsheet {
  name: string
  data: object[]
}

interface ReadXlsxOptions {
  multiSheets?: boolean
  numberRounding?: number
  dateFormat?: string
}

const recordXlsxRows = (book: Spreadsheet[], sheet: Worksheet, option?: ReadXlsxOptions) => {
  const s: any[][] = []

  sheet.eachRow({includeEmpty: true}, row => {
    const r: any[] = []
    row.eachCell({includeEmpty: true}, (cell) => {
      switch (cell.type) {
        case 2:
          if (option && option.numberRounding && cell.value !== null)
            r.push(+(cell.value as number).toFixed(option.numberRounding))
          else
            r.push(cell.value)
          break
        case 4:
          if (option && option.dateFormat)
            r.push(moment(cell.value as string).format(option.dateFormat))
          else
            r.push(cell.value)
          break
        default:
          r.push(cell.value)
      }
    })
    s.push(r)
  })

  book.push({
    name: sheet.name,
    data: s
  })
}

@Controller()
export class FileController {

  private readFromXlsx = async (file: Buffer, options: ReadXlsxOptions) => {
    const workbook = new Workbook()
    const f = await workbook.xlsx.load(file)

    const book: Spreadsheet[] = []

    if (options.multiSheets)
      f.eachSheet(ws => recordXlsxRows(book, ws, options))
    else
      recordXlsxRows(book, f.worksheets[0], options)

    return book
  }

  @Post('extractXlsxFile')
  @UseInterceptors(FileInterceptor('xlsx'))
  @Bind(UploadedFile())
  async extractXlsxFile(file: Express.Multer.File,
                        @Query('multiSheets', ParseBoolPipe) multiSheets: boolean,
                        @Query('numberRounding', ParseIntPipe) numberRounding: number,
                        @Query('dateFormat') dateFormat: string) {


    let options = {}
    if (multiSheets)
      options = {...options, multiSheets: true}
    if (numberRounding)
      options = {...options, numberRounding}
    if (dateFormat)
      options = {...options, dateFormat}

    return this.readFromXlsx(file.buffer, options)
  }

  @Post("extractXlsxFilePro")
  @UseInterceptors(FileInterceptor("xlsx"))
  @Bind(UploadedFile())
  async extractXlsxFilePro(file: Express.Multer.File,
                           @Query("head", ParseBoolPipe) head: boolean,
                           @Query("multiSheets") multiSheets: boolean | string) {
    const url = `${serverUrl}/api/upload/extractXlsx?head=${head}&multiSheets=${multiSheets}`

    const form = new FormData()
    form.append("xlsx", file.buffer, file.originalname)

    const ans = await axios.post(url, form, {headers: form.getHeaders()})

    return ans.data
  }
}
