import { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';
import { EditProductForm } from '@/app/edit/product/[id]/_components/edit-product-form';
import prisma from '@/lib/prisma-client';

export const metadata: Metadata = {
  title: 'Edit Product Page',
  description: ' Edit individual product profile and add photos',
};

interface EditProductPageParams {
  id: string;
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<EditProductPageParams>;
}) {
  const { id } = await params;
  // TODO move to a function that retrieves and parses the product
  const product = {
    title: '',
    content: '',
    ...(await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    })),
  };

  return (
    <SiteLayout>
      <EditProductForm title={product.title} content={product.content || ''} />
    </SiteLayout>
  );
}
