import React from 'react';
export interface INode {
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
    renderChildrenNode?: (item: any) => any;
    renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any;
    extraData?: any;
}
export interface IState {
    node: INode;
    extraData?: any;
    opened: boolean;
}
declare const NodeView: React.MemoExoticComponent<({ lastItem, renderNode, extraData, level, getChildrenName, node, onNodePressed, renderSeparator }: IProps) => JSX.Element>;
export default NodeView;
