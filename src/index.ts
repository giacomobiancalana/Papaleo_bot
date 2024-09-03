import * as dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';
import express from 'express';
// import bodyParser from 'body-parser';

const TOKEN: string = process.env.TOKEN;
const URL =  "https://api.telegram.org/bot";
const URL_TOKEN = `${URL}${TOKEN}`;

const app = express();
app.use(express.json());  // FON-DA-MEN-TA-LE  //TODO: da capire
//TODO: //app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Example app listening to port 3000 !!!');
})

app.post('/webhook', async (req, res) => {
  console.log(req.body);
  
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;
  await axios.post(`${URL_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text,
  });
  
  return res.send();
});

// TODO: git config
// TODO:set commands
// TODO:cloudfare workers

// async function sendTo() {
//   let res: any;
//   try {
//     res = await axios.get(`${URL}${TOKEN}${method}`);
//     // res = await axios.get('https://jsonplaceholder.typicode.com/todos/3');
//   } catch (error) {
//     console.error(error);
//   }
//   return res.data; 
// }

// (async ()=>console.log(await sendTo()))();
// guarda video https://www.youtube.com/watch?v=IlsygSzikOQ per togliere roba async
