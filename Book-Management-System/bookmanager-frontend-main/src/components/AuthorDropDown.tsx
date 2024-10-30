import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Author } from '../features/bookReducer';

interface AuthorDropdownProps {
    authors: Author[];
    value: string | null;
    onChange: (value: string | null) => void;
}

const AuthorDropdown: React.FC<AuthorDropdownProps> = ({ authors, value, onChange }) => (
    <Autocomplete
        options={authors}
        getOptionLabel={(option) => option.name}
        value={authors.find((author) => author.name === value) || null}
        onChange={(e, newValue) => onChange(newValue ? newValue.name : null)}
        renderInput={(params) => <TextField {...params} label="Author" variant="outlined" />}
    />
);
export default AuthorDropdown;
