import * as React from "react";
import { INode } from "./NodeView";
export interface IProps {
    data: any;
    extraData?: any;
    renderSeparator: (level: number, lastItem: boolean, opened: boolean) => any;
    renderNode: (elem: any, level?: number) => any;
    onNodePressed?: () => any;
    getChildrenName: (elem: any) => any;
    style?: any;
}
export interface IState {
    root: any;
}
export default class NestedListView extends React.PureComponent<IProps, IState> {
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    generateIds: (node?: INode | undefined) => INode | undefined;
    getChildrenName: (node: INode) => any;
    renderErrorMessage(prop: string): JSX.Element;
    render(): JSX.Element;
    private generateRootNode;
}
