import { SiteLayout } from '@/components/site-layout';
import { ProductCard } from '@/components/product-card';

import { getProducts } from '@/features/products/api/get-products';

export default async function Home() {
  const products = await getProducts();

  return (
    <SiteLayout>
      <div className="flex justify-between flex-wrap flex-col h-auto lg:h-screen">
        {products.map(({ id, imageUrl, title, content }) => (
          <ProductCard
            key={id}
            id={id}
            imageUrl={imageUrl}
            title={title}
            content={content}
          />
        ))}
      </div>
    </SiteLayout>
  );
}
