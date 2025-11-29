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
  productId: string,
  file: File
): Promise<UploadPhotosResponse | undefined> {
  if (!productId) {
    throw new Error('Missing required product ID');
  }

  if (Number.isNaN(parseInt(productId))) {
    throw new Error('Product ID not parseable');
  }

  if (!file) {
    throw new Error('Missing document');
  }

  if (!(file instanceof File)) {
    throw new Error('Uploaded document is not a File');
  }

  // upload to s3
  const { location, error } = await s3.upload(parseInt(productId), file);

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
  const responses: (UploadPhotosResponse | undefined)[] = [];

  for (const file of data.photos) {
    // TODO validate form data

    responses.push(await uploadPhoto(data.productId.toString(), file));

    // TODO update prisma with url response
  }

  return responses;
}

export { uploadPhoto, uploadPhotos };
