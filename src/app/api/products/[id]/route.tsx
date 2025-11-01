import prisma from '@/lib/prisma-client';
import type { NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>
) {
  const id = Number((await ctx.params).id);
  const requestBody = await request.json();
  const { title, content } = await requestBody.data;

  if (title == null || content == null) {
    return new Response('whoops!', { status: 404 });
  }

  console.log({
    where: { id },
    data: { title, content },
  });
  const result = await prisma.product.update({
    where: { id },
    data: { title, content },
  });

  return Response.json(result);
}
