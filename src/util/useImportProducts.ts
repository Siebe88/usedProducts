import Papa, { ParseResult } from 'papaparse';
import { useEffect, useState } from 'react';

export interface Product {
  id: string;
  // priority:
  default_code: string;
  standard_price: number;
  product_brand_id: string;
  name: string;
  // product_template_variant_value_ids: string;
  lst_price: number;
  product_unit_code: string;
  barcode: string;
}

export const useImportProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getCSV = () => {
    Papa.parse('/products.csv', {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ',',
      complete: (results: ParseResult<Product>) => {
        setProducts(results.data);
      },
    });
  };

  useEffect(() => {
    getCSV();
  }, []);

  return products;
};
