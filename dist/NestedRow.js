/* @flow */
import * as React from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
    nestedRow: {
        flex: 1,
        justifyContent: 'center',
    },
});
const NestedRow = React.memo(({ height, children, level = 0, paddingLeftIncrement = 10, style, }) => (<View style={[
    styles.nestedRow,
    Object.assign(Object.assign({}, style), { paddingLeft: level * paddingLeftIncrement }),
    height ? { height } : {},
]}>
            {children}
        </View>), isEqual);
export default NestedRow;
//# sourceMappingURL=NestedRow.js.map