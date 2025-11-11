import { s3Client } from '@/lib/s3-client';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { s3Url } from '@/lib/utils';

interface PhotoInfo {
  location: string | null;
  objectId: string;
}

export async function getPhotos(productId: number): Promise<PhotoInfo[]> {
  'use server';

  const s3 = s3Client();
  const objects = await s3.listObjects(productId);
  const photos: PhotoInfo[] = [];

  if (objects) {
    // return parsed objects
    return photos.concat(parsePhotoObjects(objects));
  }

  // return empty photos
  return photos;
}

function parsePhotoObjects(objectContents: ListObjectsV2Output['Contents']) {
  if (!objectContents) {
    return [];
  }

  return objectContents.map(({ Key, ETag }, index) => {
    let location: string | null = null;
    const objectId: string = ETag || index.toString();

    if (Key) {
      location = s3Url(Key);
    }

    return {
      objectId,
      location,
    };
  });
}
