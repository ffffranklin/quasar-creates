import { env } from '@/config/env';

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const s3c = new S3Client({ region: env.AWS_REGION });

class S3ClientSingleton {
  async upload(
    productId: number,
    file: File
  ): Promise<{ location?: string; error?: unknown }> {
    if (!file) {
      throw new Error(
        'Unable to upload bucket from S3, file contents are undefined'
      );
    }

    const fileArrayBuffer: ArrayBuffer = await file.arrayBuffer();
    // convert to buffer to satisfy Body type signature
    const fileBuffer: Buffer = Buffer.from(fileArrayBuffer);
    const locationPath: string = `assets/${productId}/${file.name}`;
    const location: string = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${locationPath}`;
    const Bucket: string = env.AWS_S3_BUCKET || '';
    const Key: string = locationPath;
    const Body: Buffer = fileBuffer;

    try {
      const putCommand = new PutObjectCommand({ Bucket, Key, Body });

      await s3c.send(putCommand);

      return { location };
    } catch (error) {
      // TODO handle errors
      return { error };
    }
  }

  async get(key: string) {
    const Bucket: string = env.AWS_S3_BUCKET || '';

    try {
      const getCommand = new GetObjectCommand({ Bucket, Key: key });
      const { Body } = await s3c.send(getCommand);

      return Body?.transformToString();
    } catch (error) {
      console.log('Error getting object:', error);
    }
  }
}

const s3ClientSingleton = new S3ClientSingleton();

function s3Client() {
  return s3ClientSingleton;
}

export { s3Client, S3ClientSingleton };
