import axios from 'axios';

const coolchat = axios.create({
    baseURL: "http://localhost:9000"
});

export default coolchat;