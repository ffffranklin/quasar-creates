import Axios from 'axios';
import { TEST_BASE_URL } from '@/testing/constants';

const apiClient = Axios.create({
  baseURL: TEST_BASE_URL,
});

export { apiClient };
