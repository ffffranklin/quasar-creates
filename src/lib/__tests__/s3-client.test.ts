import { beforeEach, describe, expect, it, vi } from 'vitest';
import { s3Client, S3ClientSingleton } from '@/lib/s3-client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { faker } from '@faker-js/faker/locale/en';

const { sendStub } = vi.hoisted(() => {
  const mockedClientOutput = async () => clientOutput;
  const clientOutput = {
    $metadata: {
      // httpStatusCode?: number;
      // requestId?: string;
      // extendedRequestId?: string;
      // cfId?: string;
      // attempts?: number;
      // totalRetryDelay?: number;
    },
  };

  return {
    sendStub: vi.fn(mockedClientOutput),
  };
});

const { MockS3Client } = vi.hoisted(() => ({
  MockS3Client: class {
    send = sendStub;
  },
}));

vi.mock(import('@aws-sdk/client-s3'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    S3Client: MockS3Client as any,
  };
});

describe('S3Client', () => {
  beforeEach(() => {
    sendStub.mockReset();
  });

  describe('when file uploaded', () => {
    let client: S3ClientSingleton;
    let productId: number;

    beforeEach(() => {
      productId = faker.number.int();
      client = s3Client();
    });

    it('should throw if file not provided', async () => {
      const file = undefined as unknown as File;
      const expected =
        'Unable to upload bucket from S3, file contents are undefined';

      await expect(() => client.upload(productId, file)).rejects.toThrow(
        expected
      );
    });

    it('should send file contents', async () => {
      const client = s3Client();
      const filename = 'hello.png';
      const file = new File(['hello'], filename, { type: 'image/png' });

      await client.upload(productId, file);

      const putCommand = (sendStub.mock.calls[0] as any)[0] as PutObjectCommand;

      expect(sendStub).toHaveBeenCalledTimes(1);
      expect(putCommand.input.Bucket).toEqual('');
      expect(putCommand.input.Key).toEqual(`assets/${productId}/${filename}`);
      expect(putCommand.input.Body).toEqual(expect.any(Buffer));
    });

    it('should nest file in product id directory', async () => {});
  });
});
