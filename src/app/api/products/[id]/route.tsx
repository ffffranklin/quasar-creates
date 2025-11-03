import prisma from '@/lib/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { editProductFormSchema } from '@/lib/schemas';

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>
) {
  const id = Number((await ctx.params).id);
  const requestBody = await request.json();
  const { title, content } = await requestBody.data;

  try {
    // validate fields
    editProductFormSchema.parse({ title, content });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }

  const result = await prisma.product.update({
    where: { id },
    data: { title, content } satisfies { title: string; content: string },
  });

  return Response.json(result);
}
