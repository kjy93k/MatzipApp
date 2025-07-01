import { getFormDataImages } from '@/\butils';
import ImageCropPicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import { useState } from 'react';
import { ImageUri } from '@/types';
import { Alert } from 'react-native';
import { alerts } from '@/constants';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

const useImagePicker = ({ initialImages = [] }: UseImagePickerProps) => {
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (initialImages.length + imageUris.length > 5) {
      Alert.alert(
        alerts.IMAGE_COUNT_EXCEEDED.TITLE,
        alerts.IMAGE_COUNT_EXCEEDED.DESCRIPTION,
      );
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({ uri }))]);
  };

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);

        uploadImages.mutate(formData, {
          onSuccess: data => {
            addImageUris(data);
          },
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          //
        }
      });
  };

  return { imageUris, handleChange };
};

export default useImagePicker;
