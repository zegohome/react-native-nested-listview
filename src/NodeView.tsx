/* @flow */

import isEqual from "lodash.isequal";
import * as React from "react";
import { FlatList, TouchableWithoutFeedback, View } from "react-native";

export interface INode {
  _internalId: string;
  hidden: boolean;
  opened: boolean;
  [key: string]: any;
}

export interface IProps {
  lastItem: boolean;
  generateIds?: (node?: INode) => any;
  getChildren?: () => any;
  getChildrenName: (item: INode) => any;
  node: INode;
  level: number;
  onNodePressed?: (item: any) => any;
  renderNode: (item: any, level: number) => any;
  renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any;
  renderChildrenNode?: (item: any) => any;
  extraData?: any;
}

export interface IState {
  node: INode;
  extraData?: any;
}

export default class NodeView extends React.PureComponent<IProps, IState> {
  public componentWillMount() {
    this.setState({
      node: {
        opened: false,
        ...this.props.node
      }
    });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (!isEqual(this.props.node, nextProps.node)) {
      this.setState({
        node: {
          opened: false,
          ...nextProps.node
        }
      });
    }
  }

  public onNodePressed = () => {
    this.setState({
      node: {
        ...this.state.node,
        opened: !this.state.node.opened
      }
    });

    if (this.props.onNodePressed) {
      this.props.onNodePressed(this.state.node);
    }
  };

  public renderChildren = (
    item: INode,
    level: number,
    lastItem: boolean
  ): any => {
    return (
      <NodeView
        lastItem={lastItem}
        getChildrenName={this.props.getChildrenName}
        node={item}
        level={level + 1}
        extraData={this.props.extraData}
        onNodePressed={this.props.onNodePressed}
        renderNode={this.props.renderNode}
        renderSeparator={this.props.renderSeparator}
      />
    );
  };

  public renderItem = ({ item, index }: { item: INode; index: number }) => {
    const rootChildrenName = this.props.getChildrenName(this.state.node);
    const allItems = this.state.node[rootChildrenName];
    const lastItem = allItems ? index === allItems.length - 1 : false;
    return this.renderChildren(item, this.props.level, lastItem);
  };

  public render() {
    const rootChildrenName = this.props.getChildrenName(this.state.node);
    const rootChildren = this.state.node[rootChildrenName];

    return (
      <View>
        {!this.state.node.hidden ? (
          <TouchableWithoutFeedback onPress={this.onNodePressed}>
            <View>
              {this.props.renderNode(this.state.node, this.props.level)}
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        {this.state.node.opened && rootChildren ? (
          <FlatList
            data={rootChildren}
            renderItem={this.renderItem}
            extraData={this.props.extraData}
            keyExtractor={(item: INode) => item._internalId}
            ListFooterComponent={this.state.node.footerComponent}
          />
        ) : null}
        {this.props.renderSeparator &&
          this.props.renderSeparator(
            this.props.level,
            this.props.lastItem,
            this.state.node.opened
          )}
      </View>
    );
  }
}
