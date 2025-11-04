import { env } from '@/config/env';
import { apiClient } from '@/lib/api-client';

const apiUrl = `${env.API_URL}/api/photos`;

async function uploadPhotos(productId: number, photos: any[]) {
  const response = await apiClient.postForm(apiUrl);

  return response;
}
export { uploadPhotos };
