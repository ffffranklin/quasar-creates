import { useCallback } from 'react';
import { deletePhoto } from '@/features/photos/api/delete-photo';
import { Product } from '@/lib/types';
import { uploadPhotos } from '@/features/photos/api/upload-photos';

function useDeletePhoto() {
  const deletePhotoCallback = useCallback<(key: string | null) => void>(
    async (key: string | null) => {
      if (!key) throw new Error('Cant delete without file key');

      try {
        await deletePhoto(key);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return [deletePhotoCallback];
}

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

export { useDeletePhoto, useUploadPhotos };
