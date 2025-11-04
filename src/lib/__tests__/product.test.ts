import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';
import updateProductById from '@/lib/product';
import { server } from '@/testing/setup';
import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';

describe('product', () => {
  let baseUrl: string;

  beforeEach(() => {
    baseUrl = env.API_URL;
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
      const { response } = await updateProductById(
        id,
        { title, content },
        baseUrl
      );
      const actual = response?.data;
      const expected = { id, title, content };

      expect(actual).toEqual(expected);
    });

    it('should return failed response error', async () => {
      const errorMessage = 'Failed to update product';
      const errorStatus = 400;

      server.use(
        http.post(`${env.API_URL}/api/products/:id`, () => {
          return HttpResponse.json(
            { error: { message: errorMessage, status: errorStatus } },
            { status: errorStatus }
          );
        })
      );

      const { error } = await updateProductById(
        id,
        { title, content },
        baseUrl
      );

      const actual = error;
      const expected = { message: errorMessage, status: errorStatus };

      expect(actual).toEqual(expected);
    });

    it.todo('should return dispatch error');
  });
});
