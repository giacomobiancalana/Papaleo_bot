import axios from 'axios';

import * as dotenv from 'dotenv';
dotenv.config()

const token: string = process.env.TOKEN;
const url: string = "https://api.telegram.org/bot";
const method: string = "/getMe";

async function sendTo() {
  let pp: any;
  try {
    pp = await axios.get(`${url}${token}${method}`);    
  } catch (error) {
    console.error(error);
  }
  return pp.data;
}

(async ()=>console.log(await sendTo()))();
// guarda video https://www.youtube.com/watch?v=IlsygSzikOQ per togliere roba async