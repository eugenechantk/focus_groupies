import {Configuration, OpenAIApi} from "openai";

function getStringUpToLastSpace(str) {
    const lastSpaceIndex = str.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
        return str.substring(0, lastSpaceIndex);
    }

    // If no space found, return the original string
    return str;
}

export default class GPTAPIclient {


    constructor() {
        this.apiKey = process.env.gpt_api_key;
        console.log(this.apiKey);
        // this.config = new Configuration({
        //     apiKey: this.key,
        // });

        // this.openai = new OpenAIApi(this.config);
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }

    async testAPI() {
        console.log("fetching API");
        const data = {
            'messages': [{
                'role': 'system',
                'content': 'Hello World!'
            }],
            'model': 'gpt-4'
        };
        return this.request(data);
    }

    async request(messages, model = 'gpt-4') {
        try {
            const body = JSON.stringify({messages, model})

            console.log("starting GPT request")
            // Make the POST request
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: this.headers,
                body
            });

            // Parse the response as JSON
            const responseData = await response.json();
            const generatedContent = responseData.choices[0].message.content;
            console.log("successful GPT request")
            return generatedContent;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    getPort(portName) {
        return new Promise(resolve => {
            chrome.runtime.connect()
            chrome.runtime.onConnect.addListener(function (port) {
                if (port.name === portName) {
                    resolve(port)
                }
            });
        })
    }

    async request_continuous(data, storage_id) {
        var history = await chrome.storage.local.get([storage_id]);
        console.log(storage_id, history);
        if (Object.keys(history).length === 0) {
            history = [];
        } else {
            history = JSON.parse(history[storage_id]);
        }
        history = history.concat(data);
        var all_data = {
            'messages': history,
            'model': 'gpt-4'
        };
        await chrome.storage.local.set({[storage_id]: JSON.stringify(history)});
        return this.request(history, 'gpt-4');
    }

    async requestStreaming(messages, model = 'gpt-4', requestId, transformer = (str) => str, temperature = 0.7) {
        const body = JSON.stringify({messages, model, stream: true})

        console.log("starting GPT request")
        // Make the POST request

// Create an AbortController to control and cancel the fetch request when the user hits the stop button
        const controller = new AbortController();
        let port = undefined
        if (requestId) {
            port = chrome.runtime.connect({name: requestId});
        }

// Make a POST request to the OpenAI API to get chat completions
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                messages: messages,
                temperature: temperature,
                model: model,
                stream: true,
            }),
            // Use the AbortController's signal to allow aborting the request
            // This is a `fetch()` API thing, not an OpenAI thing
            signal: controller.signal,
        });
        const reader = response.body.getReader()
        let result = ""
        await reader.read().then(function processingText({done, value}) {
            if (done) return

            const decoded = new TextDecoder().decode(value)
            console.log(decoded)
            const json = decoded.split('data: ')[1]  // this data needs some manipulation in order to be parsed, a separate concern
            const aiResponse = JSON.parse(json)
            const aiResponseText = aiResponse.choices[0].delta?.content
            result += aiResponseText || ""

            if (port) {
                port.postMessage({partial: transformer(getStringUpToLastSpace(result))});
            }
            return reader.read().then(processingText)
        }).catch(console.error)
        return transformer(result)
// Create a TextDecoder to decode the response body stream
//         let fullContent = ""
//         const reader = response.body.getReader();
//         while (true) {
//             const {done, chunk} = await reader.read();
//             if (done) {
//                 break;
//             }
//             const decoder = new TextDecoder("utf-8");
//             const decodedChunk = decoder.decode(chunk);
//             console.log("decoded: " + decodedChunk)
//             // Clean up the data
//             const lines = decodedChunk
//                 .split("\n")
//                 .map((line) => line.replace("data: ", ""))
//                 .filter((line) => line.length > 0)
//                 .filter((line) => line !== "[DONE]")
//                 .map((line) => {
//                     console.log(line)
//                     return JSON.parse(line)
//                 });
//
//             // Destructuring!
//             for (const line of lines) {
//                 const {
//                     choices: [
//                         {
//                             delta: {content},
//                         },
//                     ],
//                 } = line;
//
//                 if (content) {
//                     fullContent += content;
//                     callback(content)
//                 }
//             }
//         }
//         return fullContent
    }

    // }async requestStreaming(messages, model = 'gpt-4', callback){
    //     const body = JSON.stringify({messages, model, stream:true})
    //
    //     console.log("starting GPT request")
    //     // Make the POST request
    //     const response = await fetch(this.apiUrl, {
    //         method: 'POST',
    //         headers: this.headers,
    //         body
    //     });
    //
    //     const reader = response.body.getReader();
    //     const decoder = new TextDecoder("utf-8");
    //     let outputText = "";
    //
    //     while (true) {
    //         const { done, value } = await reader.read();
    //         if (done) {
    //             break;
    //         }
    //         // Massage and parse the chunk of data
    //         const chunk = decoder.decode(value);
    //         const lines = chunk.split("\\n");
    //         const parsedLines = lines
    //             .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
    //             .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
    //             .map((line) => JSON.parse(line)); // Parse the JSON string
    //
    //         for (const parsedLine of parsedLines) {
    //             const { choices } = parsedLine;
    //             const { delta } = choices[0];
    //             const { content } = delta;
    //             // Update the UI with the new content
    //             if (content) {
    //                 outputText += content;
    //                 callback(outputText)
    //             }
    //         }
    //     }
    //     return outputText
    // }
}