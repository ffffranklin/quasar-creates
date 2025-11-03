import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';
import updateProductById from '@/lib/product';
import { TEST_BASE_URL } from '@/testing/constants';

describe('product', () => {
  let baseUrl: string;

  beforeEach(() => {
    baseUrl = TEST_BASE_URL;
  });

  describe('when product updated', () => {
    let id: number;
    let title: string;
    let content: string;

    beforeEach(() => {
      id = faker.number.int();
      title = faker.lorem.sentence();
      content = faker.lorem.paragraph();
    });

    it('should post updates to api', async () => {
      const response = await updateProductById(id, { title, content }, baseUrl);
      const actual = await response.json();
      const expected = {
        id: id,
        title: title,
        content: content,
      };

      expect(actual).toEqual(expected);
    });

    it.todo('should return failed response error');
    it.todo('should return dispatch error');
  });
});
