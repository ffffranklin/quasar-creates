import { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';
import { EditProductForm } from '@/app/edit/product/[id]/_components/edit-product-form';
import { getProductById } from '@/features/products/api/get-product-by-id';
import { EditProductPhotos } from '@/app/edit/product/[id]/_components/edit-product-photos';
import { Fragment } from 'react';
import { getPhotos } from '@/features/photos/api/get-photos';

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

  const { error, product } = await getProductById(Number(id));
  const photos = await getPhotos(Number(id));

  return (
    <SiteLayout>
      {error ? (
        <div>Product not found</div>
      ) : (
        <Fragment>
          {photos.map(({ location, objectId }) => (
            <img
              key={objectId}
              src={location || ''}
              alt={`Photo of "${product.title}" product`}
            />
          ))}
          <EditProductPhotos id={product.id} />
          <EditProductForm
            id={product.id}
            title={product.title}
            content={product.content}
          />
        </Fragment>
      )}
    </SiteLayout>
  );
}
