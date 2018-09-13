
import React, { Component, ReactElement } from "react";

import { styled } from "@view-utils/styles";
import Tab, { TabContent, TabProps } from "./tab";
import MenuButton from "./menu-button";


const Underline = styled.div`
    position: absolute;
    right: 0;
    border-width: 0px 1px 0px 1px;
    border-style: solid;
    border-color: ${props => props.theme.text.primary};
    transition: top 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), left 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), color 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), width 0.3s
                cubic-bezier(0.35, 0, 0.25, 1);
    will-change: top, left, width, color;
`;

const ContentBar = styled.div<{ width: number }>`
    display: flex;
    flex-direction: column;
    margin-left: 0;
    height: 100%;
    width: ${props => props.width}px;
    color: ${props => props.theme.tabs.icons};
    background-color: ${props => props.theme.content.secondary};
`;

const TabsBar = styled.div<{ tabSize: number }>`
    position: relative;
    height: 100%;
    margin-top: 62px;
    margin-bottom: 32px;
    user-select: none;
    overflow: hidden;
    ${TabContent}, ${Underline} {
        height: ${props => props.tabSize}px;
    }
`;

const ExtraContent = styled.div`
    text-align: center;
    > button {
        margin: auto;
        display: flex;
        align-items: center;
        padding-top: 18px;
        padding-bottom: 18px;
    }
`;

interface VerticalTabsProps {
    width: number;
    tabSize: number;
    defaultTab: string;
    children: ReactElement<Tab>[];
    extraButton: ReactElement<MenuButton>;
    action: (selectedTab: string) => ReactElement<any> | void;
}

class VerticalTabs extends Component<VerticalTabsProps> {

    static defaultProps = {
        width: 125,
        tabSize: 65,
    }

    state = {
        activeTabIndex: this.setInitialActiveIndex(),
    };

    setInitialActiveIndex() {
        let initialIndex = 0;
        React.Children.forEach(this.props.children, (child, index) => {
            const { name } = (child as ReactElement<TabProps>).props;
            if (name === this.props.defaultTab) initialIndex = index;
        });
        return initialIndex;
    }

    onTabClick = (name: string, index: number) => {
        if (index !== this.state.activeTabIndex) {
            this.setState({ activeTabIndex: index });
            this.props.action(name);
        }
    };

    render() {
        const { width, tabSize, children, extraButton } = this.props;
        const underlinePosition = this.state.activeTabIndex*tabSize;

        return (
            <ContentBar width={width}>
                <TabsBar tabSize={tabSize}>
                    <Underline style={{ top: underlinePosition }} />
                    {
                        React.Children.map(children, (child, index) => {
                            return React.cloneElement(child as ReactElement<TabProps>, {
                                onClick: this.onTabClick,
                                active: index === this.state.activeTabIndex,
                                index,
                            });
                        })
                    }
                </TabsBar>
                <ExtraContent>{extraButton}</ExtraContent>
            </ContentBar>
        );
    }
}

export default VerticalTabs;
