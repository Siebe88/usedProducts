import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import AutoComplete from '../../Components/AutoComplete/AutoComplete';
import ImagePicker from '../../Components/ImagePicker/ImagePicker';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';

export type Product = {
  name: string;
  code: string;
  eanCode: string;
  price: number;
};

const bikeItems: Product[] = [
  {
    name: 'Mountain Bike',
    code: 'MTB001',
    eanCode: '1234567890123',
    price: 599.99,
  },
  {
    name: 'Road Bike',
    code: 'RDB002',
    eanCode: '9876543210987',
    price: 799.99,
  },
  {
    name: 'Hybrid Bike',
    code: 'HYB003',
    eanCode: '5678901234567',
    price: 499.99,
  },
  // Add more bike items here...
];

export const Component = () => {
  const [value, setValue] = useState<Product | null>(null);
  const randomCode = (Math.random() + 1).toString(36).substring(7);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Box display={'flex'} flexDirection={'column'} rowGap={2}>
      <AutoComplete
        value={value?.eanCode}
        options={bikeItems}
        onChange={(value) => {
          const foundBike = bikeItems.find((item) => item.eanCode === value);
          setValue(foundBike || null);
        }}
        getOptionLabel={(option) => {
          if (!option) return '';
          if (typeof option === 'string') return bikeItems.find((item) => item.eanCode === option)?.name || '';
          return (option as Product).name;
        }}
      />
      <Typography>Product naam: {value?.name}</Typography>
      <Typography>Productcode: {value?.code}</Typography>
      {value && (
        <Box display={'flex'} ref={componentRef} flexDirection={'column'} rowGap={2}>
          <Typography>EAN-code: {value?.eanCode}</Typography>
          <Barcode value={value?.eanCode || ''} />
          <Typography>Nieuwe Product naam: {value?.name}-used</Typography>
          <Typography>
            Nieuwe Productcode: {value?.code}-{randomCode}
          </Typography>
          <Box display={'flex'} columnGap={2} alignItems={'center'}>
            <Typography>Nieuwprijs: {value?.price}</Typography>
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
