import { useCallback } from 'react';
import { deletePhoto } from '@/features/photos/api/delete-photo';
import { useUploadPhotos } from '@/features/photos/api/upload-photos';

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

export { useDeletePhoto, useUploadPhotos };
