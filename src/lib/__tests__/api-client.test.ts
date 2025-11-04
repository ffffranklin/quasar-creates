import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { apiClient } from '@/lib/api-client';
import { server } from '@/testing/setup';
import { env } from '@/config/env';

describe('api client', () => {
  describe('when post requested', () => {
    it('should make post request', async () => {
      const urlPath = '/api-client/test';
      const url = `${env.API_URL}${urlPath}`;
      const responseContent = 'Works';
      server.use(
        http.post(url, () => {
          return new HttpResponse(responseContent, { status: 200 });
        })
      );
      const response = await apiClient.post(urlPath);
      const actual = response.data;
      const expected = responseContent;

      expect(actual).toEqual(expected);
    });
  });
});
