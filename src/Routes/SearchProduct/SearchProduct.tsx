import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import AutoComplete from '../../Components/AutoComplete/AutoComplete';
import ImagePicker from '../../Components/ImagePicker/ImagePicker';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import { Product, useImportProducts } from '../../util/useImportProducts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type UsedProductsForm = {
  product: Product | null;
  newPrice: number;
  explanation: string;
  uniqueCode: string;
  images: string[];
};

export const Component = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const importedProducts = useImportProducts();

  const { control, watch, handleSubmit } = useForm<UsedProductsForm>({
    defaultValues: {
      product: null,
      uniqueCode: (Math.random() + 1).toString(36).substring(7),
      newPrice: 0,
      explanation: '',
      images: [],
    },
  });

  const onSubmit: SubmitHandler<UsedProductsForm> = (data) => console.log(data);

  const product = watch('product');
  const uniqueCode = watch('uniqueCode');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection={'column'} rowGap={2}>
        <Controller
          control={control}
          name="product"
          render={({ field: { value, onChange } }) => (
            <AutoComplete
              value={value?.default_code}
              options={importedProducts}
              onChange={(value) => {
                const foundBike = importedProducts.find((item) => item.default_code === value);
                onChange(foundBike || null);
              }}
              getOptionLabel={(option) => {
                if (!option) return '';
                if (typeof option === 'string')
                  return importedProducts.find((item) => [item.default_code, item.name].includes(option))?.name || '';
                return (
                  (option as Product).default_code +
                  ' - ' +
                  (option as Product).name +
                  ' - ' +
                  (option as Product).barcode
                );
              }}
            />
          )}
        ></Controller>
        {product && (
          <>
            <Typography>Product naam: {product?.name}</Typography>
            <Typography>Productcode: {product?.default_code}</Typography>
            <Controller
              control={control}
              name="uniqueCode"
              render={({ field, fieldState }) => (
                <TextField
                  label="unique code"
                  {...field}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Box display={'flex'} ref={componentRef} flexDirection={'column'} rowGap={2}>
              <Barcode width={1} value={`${product?.barcode}-2-${uniqueCode}`} />
              <Typography>Nieuwe Product naam: {product?.name}-used</Typography>
              <Typography>
                Nieuwe Productcode: {product?.default_code}-2-{uniqueCode}
              </Typography>
              <Box display={'flex'} columnGap={2} alignItems={'center'}>
                <Typography>Nieuwprijs: {product?.lst_price}</Typography>
                <Controller
                  control={control}
                  name="newPrice"
                  defaultValue={product?.lst_price}
                  rules={{ required: 'Dit veld is verplicht', validate: (value) => value > 0 }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Aangepaste prijs"
                      {...field}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Box>
              <Controller
                control={control}
                name="explanation"
                rules={{ required: 'Dit veld is verplicht' }}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Toelichting"
                    {...field}
                    multiline
                    rows={3}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
          </>
        )}
        {product && (
          <Controller
            control={control}
            name="images"
            rules={{ required: 'Dit veld is verplicht' }}
            render={({ field }) => <ImagePicker value={field.value} onChange={field.onChange} />}
          />
        )}
        <Button variant="contained" fullWidth={false} onClick={handlePrint} disabled={!product}>
          Print label
        </Button>
        <Button variant="contained" type="submit" fullWidth={false} disabled={!product}>
          Opslaan
        </Button>
      </Box>
    </form>
  );
};
