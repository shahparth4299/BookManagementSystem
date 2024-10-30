import React from 'react';
import { Select, MenuItem, Box, InputLabel, FormControl } from '@mui/material';

interface YearFilterProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ value, onChange }) => {
    const years = Array.from({ length: 2024 - 2010 + 1 }, (_, i) => 2010 + i);

    return (
        <Box sx={{ width: 300 }}>
            <FormControl fullWidth variant="outlined">
                <InputLabel>Year After</InputLabel>
                <Select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                    label="Year After"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default YearFilter;
