import { default as $axios } from 'axios';

export const axios = $axios.create({
  baseURL: 'https://dummyjson.com',
});
