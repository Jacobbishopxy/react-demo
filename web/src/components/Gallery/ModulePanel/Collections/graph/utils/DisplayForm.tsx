/**
 * Created by Jacob Xie on 12/2/2020
 */

import React, {useState} from 'react'
import ProForm from "@ant-design/pro-form"
import {Divider, Form, Input, Radio, Select} from "antd"
import _ from "lodash"

import {Mixin} from "./data"
import {MixinFormItems} from "./MixinFormItems"
import {YAxisSelectorFormItems} from "./YAxisSelectorFormItems"
import {themeSelections} from "@/components/EchartsPro/themeSelections"


export interface DisplayFormProps {
  mixin: Mixin
  columns?: string[]
}

export const DisplayForm = (props: DisplayFormProps) => {

  const [yAxis, setYAxis] = useState<string[] | undefined>(props.columns)
  const [yAxisRecord, setYAxisRecord] = useState<string[][]>([])

  const xAxisOnChange = (col: string) =>
    setYAxis(_.differenceWith(props.columns, [col]))

  const yAxisOnChange = (idx: number) => (cols: string[]) => {
    if (yAxisRecord[idx]) {
      const ud = yAxisRecord.map((r, i) =>
        idx === i ? cols : r
      )
      setYAxisRecord(ud)
    } else
      setYAxisRecord([...yAxisRecord, cols])
  }

  const yAxisOnRelease = (idx: number) => {
    if (yAxisRecord[idx]) {
      const ud = yAxisRecord.filter((r, i) =>
        idx !== i
      )
      setYAxisRecord(ud)
    }
  }

  const getYAxisRest = () => _.differenceWith(yAxis, _.flatten(yAxisRecord))

  return props.columns ? (
    <>
      <ProForm.Group title="X">
        <Form.Item
          name={["x", "column"]}
          label="Column"
          rules={[{required: true, message: "Select a column for xAxis!"}]}
        >
          <Select
            placeholder="Select a column for xAxis!"
            onChange={xAxisOnChange}
            style={{width: 200}}
          >
            {props.columns.map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          name={["x", "type"]}
          label="Type"
          rules={[{required: true, message: "Select a type for xAxis!"}]}
        >
          <Radio.Group>
            <Radio value="value">Value</Radio>
            <Radio value="category">Category</Radio>
            <Radio value="time">Time</Radio>
            <Radio value="log">Log</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name={["x", "name"]}
          label="Name"
        >
          <Input style={{width: 200}} placeholder="Name of X-axis"/>
        </Form.Item>
      </ProForm.Group>

      <Divider/>

      <ProForm.Group title="Y">
        <YAxisSelectorFormItems
          yAxisOnChange={yAxisOnChange}
          getYAxisRest={getYAxisRest}
          yAxisOnRelease={yAxisOnRelease}
        />
      </ProForm.Group>

      <MixinFormItems mixin={props.mixin} columns={yAxis}/>

      <Divider/>

      <ProForm.Group title="Style">
        <Form.Item
          name="style"
          label="Theme style"
        >
          <Select
            placeholder="Select a theme for display"
            style={{width: 250}}
          >
            {themeSelections.map(t => <Select.Option key={t.name} value={t.name}>{t.ele}</Select.Option>)}
          </Select>
        </Form.Item>
      </ProForm.Group>
    </>
  ) : <></>
}
