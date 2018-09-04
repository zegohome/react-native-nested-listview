import * as React from 'react';
export interface IProps {
    height?: number;
    children: any;
    level?: number;
    paddingLeftIncrement?: number;
    style?: any;
}
export default class NestedRow extends React.PureComponent<IProps> {
    render(): JSX.Element;
}
