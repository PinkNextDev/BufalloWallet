
import React, { Component } from "react";
import { ChevronUp } from "styled-icons/feather/ChevronUp";
import { ChevronDown } from "styled-icons/feather/ChevronDown";
import R from "ramda";

import { styled } from "@view-utils/styles";


const Select = styled.div<{ minWidth: number }>`
    position: relative;
    min-width: ${props => props.minWidth}px;
    margin: 5px;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.content.selects.primary.background};
    color: ${props => props.theme.content.selects.primary.text};
    padding: 10px;
    font-size: 10px;
    border: none;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    outline: none;
    outline-color: transparent;
    transition: box-shadow 0.30s ease-in-out, outline 0.30s ease-in-out,
                outline-color 0.30s ease-in-out;
    :focus {
        box-shadow: 0 0 5px rgba(81, 203, 238, 1);
        outline: 1px solid rgba(81, 203, 238, 1);
        outline-color: rgba(81, 203, 238, 1);
    }
`;

const Title = styled.span`
    height: 100%;
    flex: auto;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 18px;
`;

const List = styled.ul<{ minWidth: number }>`
    position: absolute;
    width: 100%;
    -webkit-padding-start: 0;
    list-style-type: none;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: ${props => props.theme.content.selects.primary.background};
    min-width: ${props => props.minWidth}px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

const ListItem = styled.li`
    color: ${props => props.theme.content.selects.primary.text};
    padding: 10px 10px;
    display: block;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
`;

interface Item {
    id: number;
    title: string;
    selected: boolean;
    value: string;
}

interface ComboBoxProps {
    list: Item[];
    placeholder: string;
    action: (id: number, value: string) => void;
    minWidth: number;
}

interface ComboBoxState {
    selectedId: number;
    headerTitle: string;
    listOpen: boolean;
}

class ComboBox extends Component<ComboBoxProps, ComboBoxState> {

    static defaultProps: Partial<ComboBoxProps> = {
        placeholder: "Select...",
        minWidth: 180,
    }

    state: ComboBoxState = {
        ...this.setInitialState(),
        listOpen: false,
    };

    setInitialState() {
        for (const o of this.props.list) {
            if (o.selected) return { selectedId: o.id, headerTitle: o.title };
        }
        return { selectedId: 0, headerTitle: this.props.placeholder };
    }

    static getDerivedStateFromProps(props: ComboBoxProps, state: ComboBoxState) {
        // Handles state change (element switch).
        const el = R.find(R.propEq("selected", true))(props.list);
        if (el) {
            if (state.headerTitle !== el.title) {
                return {
                    headerTitle: el.title,
                    selectedId: el.id,
                };
            }

        } else {
            if (state.headerTitle !== props.placeholder) {
                return {
                    headerTitle: props.placeholder,
                    selectedId: 0,
                };
            }
        }
        return null;
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    closeList = () => {
        this.setState({ listOpen: false });
    }

    render() {
        const { list, action, minWidth } = this.props;
        const { listOpen, headerTitle } = this.state;

        return (
            <Select minWidth={minWidth}>
                <Header
                    onClick={this.toggleList}
                    onBlur={this.closeList}
                    tabIndex={0}
                >
                    <Title>{headerTitle}</Title>
                    {listOpen ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
                </Header>
                {listOpen && <List minWidth={minWidth}>
                    {list.map(item => (
                        <ListItem
                            key={item.id}
                            onMouseDown={() => {
                                action(item.id, item.value);
                            }}
                        >
                            {item.title}
                        </ListItem>
                    ))}
                </List>}
            </Select>
        );
    }
}

export default ComboBox;
