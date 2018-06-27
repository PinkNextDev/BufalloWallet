
import { remote } from "electron";
import React, { Component } from "react";
import { I18n } from "react-i18next";
import { connect } from "react-redux";
import { Switch } from "antd";

import TabContent from "../tab-content";
import { changeTheme } from "../../../logic/settings/actions";


function mapStateToProps(state, ownProps) {

    return {
        ...ownProps, // WORKARONUD FOR STRANGE TYPINGS BUG.
        currentTheme: state.settings.currentTheme,
    };
}

function mapDispatchToProps(dispatch: Function) {

    return {
        switchTheme: (theme) => {
            dispatch(changeTheme(theme));
        }
    };
}

interface DashboardProps {
    currentTheme,
    switchTheme: Function
}

class Dashboard extends Component<DashboardProps> {

    window = remote.getCurrentWindow();

    private onThemeSwitch = () => {

        const { currentTheme } = this.props;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        this.props.switchTheme(newTheme);
        const newBackgroundColor = newTheme === "dark" ? "#3b3b3b" : "#eceaea";
        (this.window as any).setBackgroundColor(newBackgroundColor);
    };

    render() {

        const { currentTheme } = this.props;

        return (
            <TabContent>
                <I18n ns="translations">
                    {(_, { i18n }) => <>
                        <Switch
                            checkedChildren="Light"
                            unCheckedChildren="Dark"
                            defaultChecked={currentTheme === "dark" ? false : true}
                            onChange={this.onThemeSwitch}
                            key="themeSwitcher"
                        />
                        <Switch
                            checkedChildren="PL"
                            unCheckedChildren="EN"
                            onChange={(isEN: boolean) => i18n.changeLanguage(isEN ? "pl": "en")}
                            key="langSwitcher"
                        />
                    </>}
                </I18n>
            </TabContent>
        );
    }
}

export default connect<DashboardProps>(
    mapStateToProps,
    mapDispatchToProps
)(
    Dashboard
);
