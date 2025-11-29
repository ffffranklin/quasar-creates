import { Product } from '@/lib/types';
import { useCallback } from 'react';
import { uploadPhotos } from '@/features/photos/actions/upload-photos';

const useUploadPhotos = (product: Product) => {
  const uploadFiles = useCallback(
    async (fileList: FileList | null) => {
      if (fileList && fileList.length > 0) {
        await uploadPhotos({
          data: {
            productId: product.id,
            photos: Array.from(fileList),
          },
        });
      }
    },
    [product]
  );

  return [uploadFiles];
};
export { useUploadPhotos };
