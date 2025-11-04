import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api-client';

async function updateProductById(
  id: number,
  { title, content }: { title: string; content: string },
  baseUrl: string
): Promise<{
  response: AxiosResponse | null;
  error: { message: string; status: number } | null;
}> {
  let response: AxiosResponse | null;
  let error: { message: string; status: number } | null = null;

  try {
    response = await apiClient.post(`${baseUrl}/api/products/${id}`, {
      method: 'update',
      data: { id, title, content },
    });
  } catch (e) {
    const err: AxiosError = e as AxiosError;
    response = err.response || null;
    error = response?.data.error || null;
  }

  return { response, error };
}

export { updateProductById };
