import { client } from "../httpClient"

const API_KEY = '08ced5319f82d2ef56ed1c6c';

export const getCurrancy = (baseCurrancy) => {
  return client.get(`/${API_KEY}/latest/${baseCurrancy}`);
}