/* @flow */

import React, { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet, Text, View, UIManager, Platform } from 'react-native'
import NodeView, { INode } from './NodeView'

const styles = StyleSheet.create({
  errorContainer: {
    borderColor: 'rgb(84, 85, 86)',
    backgroundColor: 'rgb(237, 57, 40)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  errorText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 17,
    fontWeight: 'bold',
  },
})

export interface IProps {
  data: any
  extraData?: any
  renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any
  renderNode: (elem: INode, level?: number) => any
  onNodePressed?: (node?: INode) => void
  getChildrenName: (elem: any) => any
  style?: any
}

export interface IState {
  root: any
}

const NestedListView = React.memo(
  ({ getChildrenName, renderNode, renderSeparator, data, onNodePressed, extraData }: IProps) => {
    const generateIds = (node?: INode) => {
      if (!node) {
        return {
        }
      }

      const childrenName: string = getChildrenName(node) || 'items'
      let children = node[childrenName]

      if (children) {
        if (!Array.isArray(children)) {
          children = Object.keys(children).map(
            (key: string) => children[key]
          )
        }
        node[childrenName] = children.map((_: INode, index: number) =>
          generateIds(children[index])
        )
      }

      //node._internalId = shortid.generate()

      return node
    }

    const generateRootNode = (props: IProps): INode => {
      return {
        //_internalId: shortid.generate(),
        items: props.data
          ? props.data.map((_: INode, index: number) =>
            generateIds(props.data[index])
          )
          : [],
        name: 'root',
        opened: true,
        hidden: true,
      }
    }
    // tslint:disable-next-line:variable-name
    const [_root, setRoot]: [INode, (_root: INode) => void] = useState(
      generateRootNode({
        renderSeparator,
        getChildrenName,
        renderNode,
        data,
        onNodePressed,
        extraData,
      })
    )

    useEffect(() => {
      if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }

    }, [])
    useEffect(() => {
      setRoot(
        generateRootNode({
          renderSeparator,
          getChildrenName,
          renderNode,
          data,
          onNodePressed,
          extraData,
        })
      )
    }, [data, extraData, getChildrenName, renderNode, onNodePressed])
    // tslint:disable-next-line:variable-name
    const _getChildrenName = (node: INode) => {
      if (node.name === 'root') {
        return 'items'
      }

      return getChildrenName ? getChildrenName(node) : 'items'
    }

    const renderErrorMessage = (prop: string) => {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            prop {prop} has not been passed
                    </Text>
        </View>
      )
    }

    if (!renderNode) {
      return renderErrorMessage('renderNode')
    }

    if (!data) {
      return renderErrorMessage('data')
    }

    return (
      <NodeView
        getChildrenName={_getChildrenName}
        lastItem={false}
        renderSeparator={renderSeparator}
        node={_root}
        onNodePressed={onNodePressed}
        generateIds={generateIds}
        level={0}
        renderNode={renderNode}
        extraData={extraData}
      />
    )
  },
  isEqual
)

export default NestedListView
