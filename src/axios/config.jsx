import axios from 'axios';

const coolchat = axios.create({
    baseURL: "https://coolchatapi-production.up.railway.app"
});

export default coolchat;