import { PhotoInfo } from '@/features/photos/api/get-photos';
import Image from 'next/image';

interface PhotosViewProps {
  children?: React.ReactNode;
}

interface PhotosViewImageProps {
  productName: string;
  location: PhotoInfo['location'];
}

export function PhotosView({ children }: PhotosViewProps) {
  return <div className="flex border-2 p-2 mb-4">{children}</div>;
}

PhotosView.Image = function PhotosViewImage({
  productName,
  location,
}: PhotosViewImageProps) {
  return (
    <Image
      className="pr-4"
      width={100}
      height={100}
      src={location || ''}
      alt={`Photo of product with id: ${productName}`}
    />
  );
};
