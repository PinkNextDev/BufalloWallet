
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import PinkApp from "./containers/PinkApp";


// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

injectGlobal`
    html, body {
        height: 100%;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        background-color: #eb78ab;
        overflow: hidden;
    }
    img {
        border-style: none;
    }
    div#app {
        height: 100%;
    }
`;

ReactDOM.render(

    <PinkApp />,
    document.getElementById("app")
);
