import React from 'react';
import { Box, FormLabel, Radio, RadioGroup, Sheet } from '@mui/joy';

interface RadioFilterProps {
    label: string;
    options: string[];
    value: string | null;
    onChange: (value: string) => void;
}

const RadioFilter: React.FC<RadioFilterProps> = ({ label, options, value, onChange }) => (
    <Box sx={{ width: 300 }}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size="lg"
            sx={{ gap: 1.5 }}
        >
            {options.map((option) => (
                <Sheet key={option} sx={{ p: 2, borderRadius: 'md', boxShadow: 'sm' }}>
                    <Radio value={option} label={option} />
                </Sheet>
            ))}
        </RadioGroup>
    </Box>
);

export default RadioFilter;
