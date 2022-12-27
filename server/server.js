// 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
 import express from 'express';
 import * as dotenv from 'dotenv';
 import cors from 'cors';
 import { Configuration, OpenAIApi } from 'openai';

 dotenv.config();
  const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
    res.status(200).send({
        message : 'Hello from open ai',
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,//higher temp means higher risk, take no risk/reply what it know
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })

    }
})

app.listen(5000, () => console.log('Server is listening on port http://localhost:5000'));
