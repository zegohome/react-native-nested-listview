/* @flow */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
    nestedRow: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default class NestedRow extends React.PureComponent {
    render() {
        const { height = 50, children, level = 0, paddingLeftIncrement = 10, style } = this.props;
        return (<View style={[
            styles.nestedRow,
            Object.assign({}, style, { height, paddingLeft: level * paddingLeftIncrement }),
        ]}>
        {children}
      </View>);
    }
}
//# sourceMappingURL=NestedRow.js.map