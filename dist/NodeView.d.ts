import * as React from "react";
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
    renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any;
    renderChildrenNode?: (item: any) => any;
    extraData?: any;
}
export interface IState {
    node: INode;
    extraData?: any;
}
export default class NodeView extends React.PureComponent<IProps, IState> {
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    onNodePressed: () => void;
    renderChildren: (item: INode, level: number, lastItem: boolean) => any;
    renderItem: ({ item, index }: {
        item: INode;
        index: number;
    }) => any;
    render(): JSX.Element;
}
