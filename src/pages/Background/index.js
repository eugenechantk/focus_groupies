import GPTAPIclient from "./GPTAPIclient/gptapiclient";

console.log('This is the background page.');
console.log('dont Put the background scripts here.');

const gptclient = new GPTAPIclient();

gptclient.request_continuous([{
    'role': 'system', 
    'content': 'Assume your name is john and you are 25yrs old.'
}], 'test').then((result)=>{
    console.log(result);
    gptclient.request_continuous([{
        'role': 'system', 
        'content': 'what is your name?'
    }], 'test').then((result)=>{
        console.log(result);
        gptclient.request_continuous([{
            'role': 'system', 
            'content': 'how old are you?'
        }], 'test').then((result)=>{
            console.log(result);
        });
    });
});