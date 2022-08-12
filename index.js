const { Configuration, OpenAIApi } = require("openai");
const tmi = require("tmi.js");
const { opentoken, username, tmioauth } = require("./src/config.json");

const options = {
	options: { debug: true },
	identity: {
		username: username,
		password: tmioauth
	},
	channels: [ 'no1crat3' ]
};

const client = new tmi.Client(options);
client.connect()

const configuration = new Configuration({
    apiKey: opentoken,
  });
const openai = new OpenAIApi(configuration);
  

function think(prompt, model="text-davinci-002", max_tokens=256){
    const response = openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: 0.7,
        max_tokens: max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response;
};

client.on('message', (target, ctw, message, self) => {
	// Ignore echoed messages.
	if(self) return;
    const args = message.split(" ");
    let argsNoCmd = [];
    let stringsNoCmd = ""
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        if(i != 0){
            argsNoCmd.append(element)
            stringNoCmd += element
            if(i != args.length - 1) stringsNoCmd += " ";
        }
    }
    if (args[0] == "!think") {
        console.log(stringsNoCmd)
        res = think(stringsNoCmd)
        console.log(res)
    }
});