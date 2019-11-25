import * as React from 'react';
export interface IProps {
    height?: number;
    children: any;
    level?: number;
    paddingLeftIncrement?: number;
    style?: any;
}
declare const NestedRow: React.MemoExoticComponent<({ height, children, level, paddingLeftIncrement, style, }: IProps) => JSX.Element>;
export default NestedRow;
