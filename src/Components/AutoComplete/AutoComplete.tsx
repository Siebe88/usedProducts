import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FC } from 'react';
import { Product } from '../../util/useImportProducts';

export type AutoCompleteInput = {
  value?: string | null; // Use a string or null to represent the selected Product's identifier
  onChange: (value: string | null) => void; // Pass the identifier instead of the entire object
  options: unknown[];
  getOptionLabel: (option: unknown) => string;
};

const AutoComplete: FC<AutoCompleteInput> = ({ value, onChange, options, getOptionLabel }) => {
  return (
    <Autocomplete
      disablePortal
      freeSolo
      id="combo-box-bike"
      options={options}
      value={value || ''} // Pass the identifier here
      sx={{ width: 300 }}
      getOptionLabel={getOptionLabel}
      onChange={(_, newValue) => onChange(newValue ? (newValue as Product).default_code : null)} // Send the identifier through onChange
      renderInput={(params) => <TextField {...params} label="Zoeken op naam" />}
    />
  );
};

export default AutoComplete;
