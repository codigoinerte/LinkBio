import { Cookie } from '@/helpers/cookies';
import axios from 'axios';

const BASE = import.meta.env.VITE_BASE_URL_API;
const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME;

const getBearer = () => {
    // console.log(COOKIE_NAME);
    // console.log(Cookie.get(COOKIE_NAME));
    return Cookie.get(COOKIE_NAME);
}

export const api = axios.create({
    baseURL: BASE,
    headers: {
        "Content-Type": "application/json",
        ...(!getBearer()? {}: {"Authorization": `Bearer ${getBearer()}`})
    }
})

api.interceptors.request.use(config => {
  const bearer = getBearer();
  if (bearer) {
    config.headers.Authorization = `Bearer ${bearer}`;
  }
  return config;
});