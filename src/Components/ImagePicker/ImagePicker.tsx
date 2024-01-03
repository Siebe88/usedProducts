import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FC } from 'react';
import { ImageList, ImageListItem, Typography } from '@mui/material';

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

export type ImagePickerProps = {
  value?: string[]; // Use a string or null to represent the selected Product's identifier
  onChange: (value: string[]) => void; // Pass the identifier instead of the entire object
};

const ImagePicker: FC<ImagePickerProps> = ({value, onChange}) => {
  // const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      onChange(urlsArray);
    }
  };

  return (
    <>
    <Typography variant="h6" sx={{marginBottom: 2}}>Afbeeldingen:</Typography>
      <ImageList cols={3} sx={{ maxWidth: 500, maxHeight: 450 }} variant="woven">
        {(value || []).map((item, index) => (
          <ImageListItem key={index} sx={{ maxWidth: 300, objectFit: 'contain', marginY: 0 }}>
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
