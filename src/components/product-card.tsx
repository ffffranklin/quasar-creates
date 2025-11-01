import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface ProductProps {
  imageUrl: string;
  title: string;
  content: string;
  id: number;
}

function ProductCard({ id, imageUrl, title, content }: ProductProps) {
  return (
    <Link href={`/edit/product/${id}`}>
      <Card className="w-full lg:w-90 h-min flex-none mb-4">
        <CardContent className="overflow-hidden">
          <img src={imageUrl} />
        </CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export { ProductCard };
