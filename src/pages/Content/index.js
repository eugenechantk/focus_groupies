import { printLine } from "./modules/print";
<<<<<<< HEAD
import logo from "../../assets/img/logo.svg";
import cursor from "../../assets/img/cursor.svg";
import React from "react";
import { createRoot } from "react-dom/client";
import AgentStatusContainer from "./components/AgentStatus/AgentStatusContainer";
import "./content.styles.css";
import { Cursor } from "./Cursor";
=======
import React from "react";
import AgentStatusContainer from "./components/AgentStatus/AgentStatusContainer";
import "./content.styles.css";
import { render } from "react-dom";
import { StyleSheetManager } from "styled-components";
>>>>>>> 365727f (fix: refactored all agent status bar component in shadow-root)

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
  console.log(response.farewell);
});

printLine("Using the 'printLine' function from the Print Module");

const body = document.querySelector("body");
const app = document.createElement("div");
app.style.cssText =
  "z-index:10000;position:fixed;bottom:16px;width:100%;display:flex;justify-content:center;";

app.id = "react-root";

// Testing
const navBar = document.getElementsByClassName("navbar-brand mr-1");

if (body) {
  body.prepend(app);
}

const linkNode = document.createElement("link"); 
linkNode.type = "text/css"; 
linkNode.rel = "stylesheet"; 
linkNode.href = "//fonts.googleapis.com/css?family=Poppins";
document.head.appendChild(linkNode);

// const container = document.getElementById("react-root");
// const root = createRoot(container);

const host = document.querySelector("#react-root");
const shadow = host.attachShadow({ mode: "open" });

// create a slot where we will attach the StyleSheetManager
const styleSlot = document.createElement("section");
// append the styleSlot inside the shadow
shadow.appendChild(styleSlot);




// create the element where we would render our app
const renderIn = document.createElement("div");
// append the renderIn element inside the styleSlot
styleSlot.appendChild(renderIn);

render(
  <StyleSheetManager target={styleSlot}>
    <AgentStatusContainer />
  </StyleSheetManager>,
  renderIn
);
