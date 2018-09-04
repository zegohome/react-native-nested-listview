/* @flow */
import isEqual from "lodash.isequal";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as shortid from "shortid";
import NodeView from "./NodeView";
const styles = StyleSheet.create({
    errorContainer: {
        borderColor: "rgb(84, 85, 86)",
        backgroundColor: "rgb(237, 57, 40)",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 60
    },
    errorText: {
        color: "rgb(255, 255, 255)",
        fontSize: 17,
        fontWeight: "bold"
    }
});
export default class NestedListView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.generateIds = (node) => {
            if (!node) {
                return;
            }
            const childrenName = this.props.getChildrenName(node) || "items";
            let children = node[childrenName];
            if (children) {
                if (!Array.isArray(children)) {
                    children = Object.keys(children).map((key) => children[key]);
                }
                node[childrenName] = children.map((_, index) => this.generateIds(children[index]));
            }
            node._internalId = shortid.generate();
            return node;
        };
        this.getChildrenName = (node) => {
            if (node.name === "root") {
                return "items";
            }
            return this.props.getChildrenName
                ? this.props.getChildrenName(node)
                : "items";
        };
        this.generateRootNode = (props) => {
            return {
                _internalId: shortid.generate(),
                items: props.data
                    ? props.data.map((_, index) => this.generateIds(props.data[index]))
                    : [],
                name: "root",
                opened: true,
                hidden: true
            };
        };
    }
    componentWillMount() {
        this.setState({ root: this.generateRootNode(this.props) });
    }
    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.data, nextProps.data)) {
            this.setState({ root: this.generateRootNode(nextProps) });
        }
    }
    renderErrorMessage(prop) {
        return (<View style={styles.errorContainer}>
        <Text style={styles.errorText}>prop {prop} has not been passed</Text>
      </View>);
    }
    render() {
        const { data, renderSeparator, getChildrenName, onNodePressed, renderNode } = this.props;
        if (!getChildrenName) {
            return this.renderErrorMessage("getChildrenName");
        }
        if (!renderNode) {
            return this.renderErrorMessage("renderNode");
        }
        if (!data) {
            return this.renderErrorMessage("data");
        }
        return (<NodeView lastItem={false} renderSeparator={renderSeparator} getChildrenName={this.getChildrenName} node={this.state.root} onNodePressed={onNodePressed} generateIds={this.generateIds} level={0} renderNode={renderNode} extraData={this.props.extraData}/>);
    }
}
//# sourceMappingURL=NestedListView.js.map