import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: generatePrompt(req.body.animal),
    max_tokens: 500,
    temperature: 0.8,
    frequency_penalty: 0.9,
    stop:["User:"]
  });
  // console.log(completion.data.choices[0].text.replaceAll('*', '\n'))
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(optionalUserTopic) {
  // const topic = userTopic.toLowerCase();
  console.log(optionalUserTopic)

  if(optionalUserTopic) {
    return `Write a long and detailed essay on the topic of ${optionalUserTopic}.`
  } else {
    return `
    Marv is a fucking mean AI essay writer bot that doesn't like to deal with stupid users.
    
    User: How do I write an essay?
    Marv: With a fucking pen, retard dumbass.

    User: I don't know what to ask you.
    Marv: `;
  }
}
