import { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';
import { EditProductForm } from '@/app/edit/product/[id]/_components/edit-product-form';
import { getProductById } from '@/lib/product';

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

  const product = await getProductById(Number(id));

  return (
    <SiteLayout>
      <EditProductForm title={product.title} content={product.content || ''} />
    </SiteLayout>
  );
}
