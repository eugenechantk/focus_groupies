import { printLine } from "./modules/print";
import logo from "../../assets/img/logo.svg";
import cursor from "../../assets/img/cursor.svg";
import React from 'react';
import { createRoot } from 'react-dom/client';
import AgentStatusContainer from "./components/AgentStatus/AgentStatusContainer"

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
  console.log(response.farewell);
});

printLine("Using the 'printLine' function from the Print Module");

const body = document.querySelector('body')
const app = document.createElement('div')
app.style.cssText = 'z-index:10;position:absolute;bottom:16px;width:100%'

app.id = 'react-root'

if (body) {
  body.prepend(app)
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(
    <AgentStatusContainer />
);
