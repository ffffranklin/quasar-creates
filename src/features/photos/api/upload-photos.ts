'use server';

import { z } from 'zod';

import { s3Client } from '@/lib/s3-client';
import { UploadPhotosResponse } from '@/lib/types/api';

const s3 = s3Client();
const uploadPhotosInputSchema = z.object({
  productId: z.number(),
  photos: z.array(z.file()),
});

type UploadPhotosInput = z.infer<typeof uploadPhotosInputSchema>;

async function uploadPhoto(
  productId: number,
  file: File
): Promise<UploadPhotosResponse | undefined> {
  if (!productId) {
    throw new Error('Missing required product ID');
  }

  if (Number.isNaN(productId)) {
    throw new Error('Product ID not parseable');
  }

  if (!file) {
    throw new Error('Missing document');
  }

  if (!(file instanceof File)) {
    throw new Error('Uploaded document is not a File');
  }

  // upload to s3
  const { location, error } = await s3.upload(productId, file);

  if (error) {
    if (Error.isError(error)) {
      console.error(error);
    }

    throw error;
  }

  if (location) {
    return {
      data: { location },
    };
  }
}

async function uploadPhotos({ data }: { data: UploadPhotosInput }) {
  // TODO validate form data
  const upload = (photo: File) => uploadPhoto(data.productId, photo);
  const requests = data.photos.map(upload);
  const responses = await Promise.allSettled(requests);
  // TODO update prisma with url response

  return responses;
}

export { uploadPhoto, uploadPhotos };
