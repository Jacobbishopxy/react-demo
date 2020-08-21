/**
 * Created by Jacob Xie on 8/16/2020.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout'
import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'antd'

import * as service from '@/services/targetTag'

import { TagsView } from "./components/TagsView"
import { TargetsView } from "./components/TargetsView"
import { Editor } from "./components/Editor"


interface Editable {
  target: boolean
  tag: boolean
}

interface TriggerEdit {
  target: number
  tag: number
}

export default () => {

  const [editable, setEditable] = useState<Editable>({ target: false, tag: false })
  const [triggerEdit, setTriggerEdit] = useState<TriggerEdit>({ target: 0, tag: 0 })
  const [tags, setTags] = useState<service.Tag[]>([])
  const [targets, setTargets] = useState<service.Target[]>([])

  useEffect(() => {
    service.getTags(false).then(res => setTags(res))
  }, [triggerEdit.tag])

  useEffect(() => {
    service.getTargets().then(res => setTargets(res))
  }, [triggerEdit.target])

  const triggerTag = () =>
    setTriggerEdit({ ...triggerEdit, tag: triggerEdit.tag + 1 })

  const triggerTarget = () =>
    setTriggerEdit({ tag: triggerEdit.tag + 1, target: triggerEdit.target + 1 })


  const tagPanelUpdate = (ts: service.Tag) =>
    service
      .saveTag(ts)
      .then(triggerTag)


  const tagPanelDelete = (name: string) =>
    service
      .deleteTag(name)
      .then(triggerTag)

  const targetPanelUpdate = (target: service.Target) =>
    service
      .saveTarget(target)
      .then(triggerTarget)

  const targetPanelDelete = (id: number) =>
    service
      .deleteTarget(id)
      .then(triggerTarget)

  return (
    <PageHeaderWrapper>
      <Row>
        <Col span={ 17 }>
          <Card
            title={ <div style={ { fontSize: 25 } }>Targets</div> }
            extra={
              <Editor
                editable={ editable.target }
                setEditable={ (e: boolean) => setEditable({ ...editable, target: e }) }
              />
            }
          >
            <TargetsView
              targets={ targets }
              tags={ tags }
              editable={ editable.target }
              targetOnCreate={ targetPanelUpdate }
              targetOnDelete={ targetPanelDelete }
            />
          </Card>
        </Col>

        <Col span={ 7 }>
          <Card
            title={ <div style={ { fontSize: 25 } }>Tags</div> }
            extra={
              <Editor
                editable={ editable.tag }
                setEditable={ (e: boolean) => setEditable({ ...editable, tag: e }) }
              />
            }
          >
            <TagsView
              tags={ tags }
              editable={ editable.tag }
              tagOnCreate={ tagPanelUpdate }
              tagOnRemove={ tagPanelDelete }
            />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  )
};