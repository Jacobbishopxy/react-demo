/**
 * Created by Jacob Xie on 10/3/2020.
 */

import React, {useState} from 'react'
import {Table} from "antd"

import {Editor} from "@/components/Editor"
import {SpaceBetween} from "@/components/SpaceBetween"
import * as DataType from "../GalleryDataType"
import {EditableTagPanel} from "../Tag/EditableTagPanel"


export interface DashboardConfigTableProps {
  data: DataType.Dashboard[]
  saveTemplate: (dashboardName: string, template: DataType.Template) => void
  deleteTemplate: (dashboardName: string, templateName: string) => void
}

/**
 * dealing with dashboard creating & modifying
 */
export const DashboardConfigTable = (props: DashboardConfigTableProps) => {

  const [editable, setEditable] = useState<boolean>(false)

  const saveTemplate = (dashboardName: string) =>
    (template: DataType.Template) => props.saveTemplate(dashboardName, template)

  const deleteTemplate = (dashboardName: string) =>
    (templateName: string) => props.deleteTemplate(dashboardName, templateName)

  return (
    <div>
      <Table
        dataSource={props.data.map(i => ({...i, key: i.name}))}
        title={() =>
          <SpaceBetween>
            <span style={{fontWeight: "bold"}}>Dashboard configuration</span>
            <Editor onChange={setEditable}/>
          </SpaceBetween>
        }
        size="small"
        bordered
        pagination={{pageSize: 10}}
      >
        <Table.ColumnGroup title="Dashboard">
          <Table.Column
            title="Name"
            dataIndex="name"
            key="name"
          />
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
          />
        </Table.ColumnGroup>
        <Table.Column
          title="Templates"
          dataIndex="templates"
          key="templates"
          render={(templates: DataType.Template[], record: DataType.Dashboard) =>
            <EditableTagPanel
              name={`dt-${record.name}`}
              data={templates}
              editable={editable}
              elementOnCreate={saveTemplate(record.name)}
              elementOnRemove={deleteTemplate(record.name)}
            />
          }
        />
      </Table>
    </div>
  )
}

