import GPTAPIclient from "./GPTAPIclient/gptapiclient";

console.log('This is the background page.');
console.log('dont Put the background scripts here.');

const gptclient = new GPTAPIclient();
gptclient.testAPI().then((result)=>{
    console.log(result);
});
