import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePicker: FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages(urlsArray);
    }
  };

  return (
    <>
      <ImageList cols={3} rowHeight={264} sx={{ maxWidth: 500, maxHeight: 450 }} variant="woven">
        {selectedImages.map((item, index) => (
          <ImageListItem key={index} sx={{ maxWidth: 300, objectFit: 'contain' }}>
            <img
              srcSet={`${item}`}
              src={`${item}`}
              style={{ objectFit: 'contain', maxWidth: 300 }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button component="label" variant="contained">
        Selecteer afbeeldingen
        <VisuallyHiddenInput
          type="file"
          multiple
          accept="image/jpeg, image/jpg, image/png, image/gif"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
};

export default ImagePicker;
