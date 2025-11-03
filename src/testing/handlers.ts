import { http, HttpResponse, PathParams } from 'msw';
import { Product } from '@/lib/types';
import { product } from '@/testing/factories';
import { TEST_BASE_URL } from '@/testing/constants';

export const restHandlers = [
  http.post<PathParams, { method: 'update'; data: Product }>(
    `${TEST_BASE_URL}/api/products/:id`,
    async ({ request }) => {
      const req = await request.clone().json();

      if (!req.method) {
        return HttpResponse.json(
          { error: { message: 'Missing meta HTTP method' } },
          { status: 400 }
        );
      }

      switch (req.method) {
        case 'update': {
          const response = product({
            id: req.data.id,
            title: req.data.title,
            content: req.data.content,
          });

          return HttpResponse.json(response);
        }
        default: {
          return new HttpResponse("Couldn't handle request", { status: 400 });
        }
      }
    }
  ),
];
