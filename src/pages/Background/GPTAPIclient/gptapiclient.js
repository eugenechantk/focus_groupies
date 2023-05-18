import {Configuration, OpenAIApi } from "openai";

export default class GPTAPIclient{
    
    constructor(){
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

    async request(messages, model = 'gpt-4'){
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

    async request_continuous(data, storage_id){
        var history = await chrome.storage.local.get([storage_id]);
        console.log(storage_id, history);
        if (Object.keys(history).length === 0){
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
        return this.request(history,  'gpt-4');
    }
}