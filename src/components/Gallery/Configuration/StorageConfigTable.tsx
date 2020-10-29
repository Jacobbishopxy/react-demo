/**
 * Created by Jacob Xie on 10/28/2020.
 */

import React, { useEffect, useState } from 'react'

import { Editor } from "@/components/Editor"
import * as DataType from "../GalleryDataType"
import { Table } from "antd"

import { StringField, NumberField, SelectionField, PasswordField, OperationField } from "./FieldView"


export interface StorageConfigTableProps {
  data: DataType.Storage[]
  saveStorage: (storage: DataType.Storage) => void
  deleteStorage: (id: string) => void
  checkConnection: (id: string) => void
}

// todo: 1. status column for connection checking; 2. `deleteStorage`
export const StorageConfigTable = (props: StorageConfigTableProps) => {

  const [editable, setEditable] = useState<boolean>(false)
  const [selectedStorage, setSelectedStorage] = useState<DataType.Storage | undefined>()

  useEffect(() => {
    if (!editable) setSelectedStorage(undefined)
  }, [editable])

  const nameOnChange = (name: string) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      name
    })
  }

  const descriptionOnChange = (description: string) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      description
    })
  }

  const typeOnChange = (type: string) => {
    if (selectedStorage) {
      const t = DataType.getStorageType(type)
      if (t) setSelectedStorage({
        ...selectedStorage,
        type: t
      })
    }
  }

  const hostOnChange = (host: string) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      host
    })
  }

  const portOnChange = (port: number) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      port
    })
  }

  const databaseOnChange = (database: string) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      database
    })
  }

  const usernameOnChange = (username: string) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      username
    })
  }

  const passwordOnChange = (password: string) => {
    if (selectedStorage) setSelectedStorage({
      ...selectedStorage,
      password
    })
  }

  const saveStorage = () => {
    if (selectedStorage) props.saveStorage(selectedStorage)
  }

  return (
    <div>
      <Table
        dataSource={ props.data.map(i => ({ ...i, key: i.id })) }
        title={ () =>
          <div style={ { display: "flex", justifyContent: "space-between" } }>
            <span style={ { fontWeight: "bold" } }>Storage configuration</span>
            <Editor onChange={ setEditable }/>
          </div>
        }
        size="small"
        bordered
        pagination={ { pageSize: 10 } }
        expandable={ {
          expandedRowRender: (record: DataType.Storage) => <span>ID: { record.id }</span>
        } }
        rowSelection={ editable ? {
          type: "radio",
          onSelect: ((record: DataType.Storage) => setSelectedStorage(record)),
        } : undefined }
      >
        <Table.Column
          title="Name"
          dataIndex="name"
          key="name"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <StringField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.name }
              onChange={ nameOnChange }
            />
          }
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <StringField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.description }
              onChange={ descriptionOnChange }
            />
          }
        />
        <Table.Column
          title="Type"
          dataIndex="type"
          key="type"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <SelectionField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.type }
              selections={ DataType.storageTypeList }
              onChange={ typeOnChange }
            />
          }
        />
        <Table.Column
          title="Host"
          dataIndex="host"
          key="host"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <StringField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.host }
              onChange={ hostOnChange }
            />
          }
        />
        <Table.Column
          title="Port"
          dataIndex="port"
          key="port"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <NumberField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.port }
              onChange={ portOnChange }
            />
          }
        />
        <Table.Column
          title="Database"
          dataIndex="database"
          key="database"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <StringField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.database }
              onChange={ databaseOnChange }
            />
          }
        />
        <Table.Column
          title="Username"
          dataIndex="username"
          key="username"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <StringField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.username }
              onChange={ usernameOnChange }
            />
          }
        />
        <Table.Column
          title="Password"
          dataIndex="password"
          key="password"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <PasswordField
              editable={ editable && record.id === selectedStorage?.id }
              defaultValue={ record.password }
              onChange={ passwordOnChange }
            />
          }
        />
        <Table.Column
          title="Operation"
          render={ (storages: DataType.Storage[], record: DataType.Storage) =>
            <OperationField
              editable={ editable }
              onTrueClick={ saveStorage }
              onFalseClick={ () => props.checkConnection(record.id!) }
              disabled={ record.id !== selectedStorage?.id }/>
          }
        />
      </Table>
    </div>
  )
}
