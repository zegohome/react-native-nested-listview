import React from 'react';
import { INode } from './NodeView';
export interface IProps {
    data: any;
    extraData?: any;
    renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any;
    renderNode: (elem: INode, level?: number) => any;
    onNodePressed?: (node?: INode) => void;
    getChildrenName: (elem: any) => any;
    style?: any;
}
export interface IState {
    root: any;
}
declare const NestedListView: React.MemoExoticComponent<({ getChildrenName, renderNode, renderSeparator, data, onNodePressed, extraData }: IProps) => JSX.Element>;
export default NestedListView;
