import Axios from 'axios';
import { env } from '@/config/env';

const apiClient = Axios.create({
  baseURL: env.API_URL,
});

export { apiClient };
