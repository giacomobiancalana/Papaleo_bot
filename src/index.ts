import axios from 'axios';

const token: string = "6005659200:AAFtTvmf6yc1DetLobvGfsHrO7MgEDAA6o0";
const url: string = "https://api.telegram.org/bot"
const method: string = "/getMe"

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