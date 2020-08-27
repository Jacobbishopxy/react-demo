/**
 * Created by Jacob Xie on 8/26/2020.
 */

import React, { useState } from "react"
import { Button, Card, Select } from "antd"

import { CreationModal } from "./CreationModal"
import { ControllerProps } from "./data"


export const Controller = (props: ControllerProps) => {

  const [visible, setVisible] = useState<boolean>(false)

  const categoryCreateModalOnOk = (value: any) => {
    props.onCreateCategory(value)
    setVisible(false)
  }

  return (
    <Card
      size="small"
    >
      <div style={ { display: 'flex', justifyContent: 'space-between' } }>
        <Select
          style={ { width: 200 } }
          onChange={ props.onSelectCategory }
          size="small"
        >
          {
            props.categoryNames.map(n =>
              <Select.Option key={ n } value={ n }>
                { n }
              </Select.Option>
            )
          }
        </Select>
        <Button
          type="primary"
          onClick={ () => setVisible(true) }
          size="small"
        >
          New Category
        </Button>
      </div>

      <CreationModal
        title="Please enter new category information below:"
        visible={ visible }
        onSubmit={ categoryCreateModalOnOk }
        onCancel={ () => setVisible(false) }
      />
    </Card>
  )
}
