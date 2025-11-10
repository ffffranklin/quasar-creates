import { describe, expect, it } from 'vitest';
import { uploadPhotos } from '@/features/photos/api/upload-photos';
import { faker } from '@faker-js/faker/locale/en';

describe('uploadPhotos', () => {
  describe('when uploading photos', () => {
    it.skip('should return an array of photos', async () => {
      const photos: File[] = [];
      const productId = faker.number.int();
      const response = await uploadPhotos({ data: { productId, photos } });

      const expected = {};
      const actual = response;

      expect(actual).toEqual(expected);
    });
  });
});
