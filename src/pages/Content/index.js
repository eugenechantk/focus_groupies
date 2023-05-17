import { printLine } from "./modules/print";

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
  console.log(response.farewell);
});

printLine("Using the 'printLine' function from the Print Module");
