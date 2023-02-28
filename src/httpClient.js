import axios from "axios";

export const client = axios.create({
  baseURL: 'https://v6.exchangerate-api.com/v6',
  // baseURL: '',
});