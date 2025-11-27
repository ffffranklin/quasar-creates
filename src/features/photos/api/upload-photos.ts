import { apiClient } from '@/lib/api-client';
import { z } from 'zod';
import type { AxiosResponse } from 'axios';
import { Product } from '@/lib/types';
import { useCallback } from 'react';

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
    form.append('productId', `${data.productId}`);

    // TODO validate form data

    responses.push(await apiClient.postForm(url, form));

    // TODO update prisma with url response
  }

  return responses;
}

const useUploadPhotos = (product: Product) => {
  const uploadFiles = useCallback(
    async (fileList: FileList | null) => {
      if (fileList && fileList.length > 0) {
        await uploadPhotos({
          data: {
            productId: product.id,
            photos: Array.from(fileList),
          },
        });
      }
    },
    [product]
  );

  return [uploadFiles];
};

export { uploadPhotos, useUploadPhotos };
