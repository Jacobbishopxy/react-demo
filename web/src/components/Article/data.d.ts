/**
 * Created by Jacob Xie on 2/5/2021
 */

import React from "react"


export interface GenericTag {
  id?: string
  name: string
  description?: string
  color?: string
}

export interface ArticleOutput {
  value: string
  tags?: GenericTag[]
}

export interface CreationTriggerActions {
  onClick: () => void
}

export interface ArticleCreationModalProps {
  trigger: React.FC<CreationTriggerActions>
  tags?: GenericTag[]
  initialValue?: ArticleOutput
  onSubmit: (value: ArticleOutput) => void
  modalWidth?: string | number
  modalHeight?: string | number
}

export interface TagCreationModalProps {
  trigger: React.FC<CreationTriggerActions>
  onSubmit: (value: GenericTag) => void
  modalWidth?: string | number
  modalHeight?: string | number
}

export interface TagModificationModalProps {
  trigger: React.FC<CreationTriggerActions>
  tags: GenericTag[]
  onSubmit: (v: any) => void
  modalWidth?: string | number
  modalHeight?: string | number
}

