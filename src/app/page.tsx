import { SiteLayout } from '@/components/site-layout';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/product';

export default async function Home() {
  const products = await getProducts();

  return (
    <SiteLayout>
      <div className="flex justify-between flex-wrap flex-col h-auto lg:h-screen">
        {products.map(({ id, imageUrl, title, price }) => (
          <ProductCard
            key={id}
            id={id}
            imageUrl={imageUrl}
            title={title}
            price={price}
          />
        ))}
      </div>
    </SiteLayout>
  );
}
