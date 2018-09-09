/* @flow */
import isEqual from "lodash.isequal";
import * as React from "react";
import { FlatList, TouchableWithoutFeedback, View, LayoutAnimation } from "react-native";
export default class NodeView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onNodePressed = () => {
            this.setState({
                node: Object.assign({}, this.state.node, { opened: !this.state.node.opened })
            });
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            if (this.props.onNodePressed) {
                this.props.onNodePressed(this.state.node);
            }
        };
        this.renderChildren = (item, level, lastItem) => {
            return (<NodeView lastItem={lastItem} getChildrenName={this.props.getChildrenName} node={item} level={level + 1} extraData={this.props.extraData} onNodePressed={this.props.onNodePressed} renderNode={this.props.renderNode} renderSeparator={this.props.renderSeparator}/>);
        };
        this.renderItem = ({ item, index }) => {
            const rootChildrenName = this.props.getChildrenName(this.state.node);
            const allItems = this.state.node[rootChildrenName];
            const lastItem = allItems ? index === allItems.length - 1 : false;
            return this.renderChildren(item, this.props.level, lastItem);
        };
    }
    componentWillMount() {
        this.setState({
            node: Object.assign({ opened: false }, this.props.node)
        });
    }
    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.node, nextProps.node)) {
            this.setState({
                node: Object.assign({ opened: this.state.node.opened }, nextProps.node)
            });
        }
    }
    render() {
        const rootChildrenName = this.props.getChildrenName(this.state.node);
        const rootChildren = this.state.node[rootChildrenName];
        return (<View>
        {!this.state.node.hidden ? (<TouchableWithoutFeedback onPress={this.onNodePressed}>
            <View>
              {this.props.renderNode(this.state.node, this.props.level)}
            </View>
          </TouchableWithoutFeedback>) : null}
        {this.state.node.opened && rootChildren ? (<FlatList data={rootChildren} renderItem={this.renderItem} extraData={this.props.extraData} keyExtractor={(item) => item.id} ListFooterComponent={this.state.node.renderFooter &&
            this.state.node.renderFooter(this.state.node)}/>) : null}
        {this.props.renderSeparator &&
            this.props.renderSeparator(this.props.level, this.props.lastItem, this.state.node.opened)}
      </View>);
    }
}
//# sourceMappingURL=NodeView.js.map