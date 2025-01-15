import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = 'https://whatsapp-backend-1-n217.onrender.com'

export default axios.create({
    baseURL: BASE_URL,
  });
  
  export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });


  export const socket = io(BASE_URL)