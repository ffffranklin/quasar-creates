import { apiClient } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import type { AxiosResponse } from 'axios';

const uploadPhotosInputSchema = z.object({
  productId: z.number(),
  photos: z.array(z.file()),
});

type UploadPhotosInput = z.infer<typeof uploadPhotosInputSchema>;

async function uploadPhotos({ data }: { data: UploadPhotosInput }) {
  const url = `/products/${data.productId}/photos`;
  const responses: AxiosResponse[] = [];

  for (const file of data.photos) {
    const form = new FormData();
    form.append('file', file);
    responses.push(await apiClient.postForm(url, form));
    // TODO update prisma with url response
  }

  return responses;
}

interface UseUploadPhotosOptions {
  mutationConfig?: MutationConfig<typeof uploadPhotos>;
}

function useUploadPhotos({ mutationConfig }: UseUploadPhotosOptions) {
  return useMutation({
    ...(mutationConfig || {}),
    mutationFn: uploadPhotos,
  });
}

export { uploadPhotos, useUploadPhotos };
