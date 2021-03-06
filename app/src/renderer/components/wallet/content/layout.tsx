
import styled from "styled-components";


export const Content = styled.div`
    grid-area: content;
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: ${props => props.theme.content.primary};
`;
