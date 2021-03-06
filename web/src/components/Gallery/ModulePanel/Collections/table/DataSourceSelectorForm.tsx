/**
 * Created by Jacob Xie on 1/4/2021
 */

import {useState} from "react"
import {Button, Form, Radio, Space} from "antd"
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons"
import {FormattedMessage} from "umi"
import _ from "lodash"

import {QuerySelectorModal} from "@/components/Gallery/Dataset"
import {FileExtractModal} from "@/components/FileUploadModal"
import {fileExtract, fileExtractUrl} from "@/components/Gallery/Misc/FileUploadConfig"
import * as DataType from "../../../GalleryDataType"
import {DataSelectedType} from "@/components/Gallery/Utils/data"


export interface DataSourceSelectorFormProps {
  content?: DataType.Content
  saveContent: (content: DataType.Content) => void
  fetchStorages: () => Promise<DataType.StorageSimple[]>
  fetchTableList: (id: string) => Promise<string[]>
  fetchTableColumns: (storageId: string, tableName: string) => Promise<string[]>
  dataType?: DataSelectedType
  dataSelected: (v: DataSelectedType) => void
}

export const DataSourceSelectorForm = (props: DataSourceSelectorFormProps) => {
  const [uploadVisible, setUploadVisible] = useState(false)
  const [content, setContent] = useState<DataType.Content | undefined>(props.content)
  const [dataAvailable, setDataAvailable] = useState(false)

  const saveContentData = (data: Record<string, any>) => {

    if (_.isEmpty(data))
      return false

    const ctt = content ? {
      ...content!,
      data
    } : {
      date: DataType.today(),
      data
    }

    setContent(ctt)
    props.saveContent(ctt)
    setDataAvailable(true)

    return true
  }

  const dataSelect = () => {
    if (props.dataType === "dataset")
      return (
        <QuerySelectorModal
          trigger={<Button type="primary">Click</Button>}
          storagesOnFetch={props.fetchStorages}
          storageOnSelect={props.fetchTableList}
          tableOnSelect={props.fetchTableColumns}
          onSubmit={saveContentData}
          columnsRequired
        />
      )
    if (props.dataType === "file")
      return (
        <>
          <Button
            type="primary"
            onClick={() => setUploadVisible(true)}
          >
            <FormattedMessage id="gallery.component.general26" />
          </Button>

          <FileExtractModal
            setVisible={setUploadVisible}
            visible={uploadVisible}
            uploadAddress={fileExtractUrl}
            upload={fileExtract}
            uploadResHandle={saveContentData}
            multiSheetDisable
          />
        </>
      )
    return (
      <Button type="primary" disabled>
        <FormattedMessage id="gallery.component.general26" />
      </Button>
    )
  }

  return (
    <Form.Item label="Data type">
      <Radio.Group onChange={e => props.dataSelected(e.target.value)}>
        <Radio value="dataset">
          <FormattedMessage id="gallery.component.general54" />
        </Radio>
        <Radio value="file">
          <FormattedMessage id="gallery.component.general55" />
        </Radio>
      </Radio.Group>
      <Space>
        {dataSelect()}
        {
          dataAvailable ?
            <CheckCircleTwoTone twoToneColor="green" /> :
            <CloseCircleTwoTone twoToneColor="red" />
        }
      </Space>
    </Form.Item>
  )
}

