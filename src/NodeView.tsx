/* @flow */

import React, { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { FlatList, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native'

export interface INode {
  hidden: boolean
  opened: boolean
  [key: string]: any
}

export interface IProps {
  lastItem: boolean
  generateIds?: (node?: INode) => any
  getChildren?: () => any
  getChildrenName: (item: INode) => any
  node: INode
  level: number
  onNodePressed?: (item: any) => any
  renderNode: (item: any, level: number) => any
  renderChildrenNode?: (item: any) => any
  renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any;
  extraData?: any
}

export interface IState {
  node: INode
  extraData?: any
  opened: boolean
}

const NodeView = React.memo(
  ({
    lastItem,
    renderNode,
    extraData,
    level,
    getChildrenName,
    node,
    onNodePressed,
    renderSeparator
  }: IProps) => {
    // tslint:disable-next-line:variable-name
    const [_node, setNode]: [INode, any] = useState({
      opened: false,
      ...node,
    })

    useEffect(() => {
      setNode({
        ...node,
        opened: _node.opened,
      })
    }, [node])

    // tslint:disable-next-line:variable-name
    const _onNodePressed = () => {
      setNode({
        ..._node,
        opened: !_node.opened,
      })

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      if (onNodePressed) {
        onNodePressed(_node)
      }
    }

    // tslint:disable-next-line:variable-name
    const renderChildren = (item: INode, _level: number, lastItem: boolean): any => {
      return (
        <NodeView
          lastItem={lastItem}
          getChildrenName={getChildrenName}
          node={item}
          level={_level + 1}
          extraData={extraData}
          onNodePressed={onNodePressed}
          renderNode={renderNode}
          renderSeparator={renderSeparator}
        />
      )
    }

    const renderItem = ({ item, index }: { item: INode, index: number }) => {
      const rootChildrenName = getChildrenName(node);
      const allItems = node[rootChildrenName];
      const lastItem = allItems ? index === allItems.length - 1 : false;
      return renderChildren(item, level, lastItem);
    }

    const rootChildrenName = getChildrenName(_node)
    const rootChildren = _node[rootChildrenName]

    return (
      <>
        {!_node.hidden ? (
          <TouchableWithoutFeedback onPress={_onNodePressed}>
            <View>{renderNode(_node, level)}</View>
          </TouchableWithoutFeedback>
        ) : null}
        {_node.opened && rootChildren ? (
          <FlatList
            data={rootChildren}
            renderItem={renderItem}
            extraData={extraData}
            keyExtractor={(item: INode) => item.id}
            ListFooterComponent={
              node.renderFooter &&
              node.renderFooter(node)
            }
          />
        ) : null}
        {renderSeparator &&
          renderSeparator(
            level,
            lastItem,
            node.opened
          )}

      </>
    )
  },
  isEqual
)

export default NodeView
