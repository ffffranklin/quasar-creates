import { describe, expect, it } from 'vitest';
import { upload } from '@/lib/uploader';

describe('Uploader', () => {
  describe('when photos uploaded', () => {
    it('returns true when uploaded', async () => {
      const photos: any[] = [];
      const actual = await upload();
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });
});
