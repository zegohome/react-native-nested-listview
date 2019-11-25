/* @flow */
import React, { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { FlatList, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
const NodeView = React.memo(({ lastItem, renderNode, extraData, level, getChildrenName, node, onNodePressed, renderSeparator }) => {
    // tslint:disable-next-line:variable-name
    const [_node, setNode] = useState(Object.assign({ opened: false }, node));
    useEffect(() => {
        setNode(Object.assign(Object.assign({}, node), { opened: _node.opened }));
    }, [node]);
    // tslint:disable-next-line:variable-name
    const _onNodePressed = () => {
        setNode(Object.assign(Object.assign({}, _node), { opened: !_node.opened }));
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (onNodePressed) {
            onNodePressed(_node);
        }
    };
    // tslint:disable-next-line:variable-name
    const renderChildren = (item, _level, lastItem) => {
        return (<NodeView lastItem={lastItem} getChildrenName={getChildrenName} node={item} level={_level + 1} extraData={extraData} onNodePressed={onNodePressed} renderNode={renderNode} renderSeparator={renderSeparator}/>);
    };
    const renderItem = ({ item, index }) => {
        const rootChildrenName = getChildrenName(node);
        const allItems = node[rootChildrenName];
        const lastItem = allItems ? index === allItems.length - 1 : false;
        return renderChildren(item, level, lastItem);
    };
    const rootChildrenName = getChildrenName(_node);
    const rootChildren = _node[rootChildrenName];
    return (<>
        {!_node.hidden ? (<TouchableWithoutFeedback onPress={_onNodePressed}>
            <View>{renderNode(_node, level)}</View>
          </TouchableWithoutFeedback>) : null}
        {_node.opened && rootChildren ? (<FlatList data={rootChildren} renderItem={renderItem} extraData={extraData} keyExtractor={(item) => item.id} ListFooterComponent={node.renderFooter &&
        node.renderFooter(node)}/>) : null}
        {renderSeparator &&
        renderSeparator(level, lastItem, node.opened)}

      </>);
}, isEqual);
export default NodeView;
//# sourceMappingURL=NodeView.js.map