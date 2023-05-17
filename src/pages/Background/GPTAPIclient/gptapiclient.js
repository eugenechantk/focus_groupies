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
        try {
            // Make the POST request
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });
    
            // Parse the response as JSON
            const responseData = await response.json();
            const generatedContent = responseData.choices[0].message.content;
            // Log the response data
            console.log(generatedContent);
            return generatedContent;
        } catch (error) {
            console.error('Error:', error);
        }    
    }
}