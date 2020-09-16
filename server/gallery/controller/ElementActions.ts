/**
 * Created by Jacob Xie on 8/29/2020.
 */

import { Request, Response } from "express"

import * as elementService from "../service/ElementService"
import * as utils from "../../utils"
import { Element } from "../entity/Element"


export async function getAllElements(req: Request, res: Response) {
  const ans = await elementService.getAllElements()

  res.send(ans)
}

export async function getElementsByIds(req: Request, res: Response) {
  if (utils.expressErrorsBreak(req, res)) return

  const ids = (req.query.ids as string).split(",")
  const ans = await elementService.getElementsByIds(ids)

  res.send(ans)
}

export async function saveElement(req: Request, res: Response) {
  if (utils.expressErrorsBreak(req, res)) return

  const ans = await elementService.saveElement(req.body as Element)

  res.status(ans).end()
}

export async function deleteElement(req: Request, res: Response) {
  if (utils.expressErrorsBreak(req, res)) return

  const ans = await elementService.deleteElement(req.query.id as string)

  res.status(ans).end()
}

// =====================================================================================================================
