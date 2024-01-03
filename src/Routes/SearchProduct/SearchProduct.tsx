import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import AutoComplete from '../../Components/AutoComplete/AutoComplete';
import ImagePicker from '../../Components/ImagePicker/ImagePicker';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import { Product, useImportProducts } from '../../util/useImportProducts';

export const Component = () => {
  const [value, setValue] = useState<Product | null>(null);
  const randomCode = (Math.random() + 1).toString(36).substring(7);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const importedProducts = useImportProducts();
  console.log(importedProducts);

  console.log();

  return (
    <Box display={'flex'} flexDirection={'column'} rowGap={2}>
      <AutoComplete
        value={value?.default_code}
        options={importedProducts}
        onChange={(value) => {
          const foundBike = importedProducts.find((item) => item.default_code === value);
          setValue(foundBike || null);
        }}
        getOptionLabel={(option) => {
          console.log({ option, type: typeof option });
          if (!option) return '';
          if (typeof option === 'string')
            return importedProducts.find((item) => [item.default_code, item.name].includes(option))?.name || '';
          return (
            (option as Product).default_code + ' - ' + (option as Product).name + ' - ' + (option as Product).barcode
          );
        }}
      />
      <Typography>Product naam: {value?.name}</Typography>
      <Typography>Productcode: {value?.default_code}</Typography>
      {value && (
        <Box display={'flex'} ref={componentRef} flexDirection={'column'} rowGap={2}>
          <Typography>EAN-code: {`${value?.barcode}-2-${randomCode}`}</Typography>
          <Barcode value={`${value?.barcode}-2-${randomCode}`} />
          <Typography>Nieuwe Product naam: {value?.name}-used</Typography>
          <Typography>
            Nieuwe Productcode: {value?.default_code}-2-{randomCode}
          </Typography>
          <Box display={'flex'} columnGap={2} alignItems={'center'}>
            <Typography>Nieuwprijs: {value?.lst_price}</Typography>
            <TextField label="Aangepaste prijs" />
          </Box>
          <TextField label="Toelichting:" multiline rows={4} />
        </Box>
      )}
      <ImagePicker />
      <Button variant="contained" fullWidth={false} onClick={handlePrint}>
        Print label
      </Button>
      <Button variant="contained" fullWidth={false}>
        Opslaan
      </Button>
    </Box>
  );
};
