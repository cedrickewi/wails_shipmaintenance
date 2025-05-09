import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface InventoryItem {
    name: string;
    type: 'Tool' | 'Spare Part' | 'Material' | 'Consumable';
    unit: string;
    quantity_available: number;
    min_stock_level: number;
    location: string;
}

const AddInventoryItem: React.FC = () => {
    const [formData, setFormData] = useState<InventoryItem>({
        name: '',
        type: 'Tool',
        unit: '',
        quantity_available: 0,
        min_stock_level: 0,
        location: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name as string]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to save the item
        console.log('Form submitted:', formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, m: 'auto', p: 2 }}>
            <h2>Add New Inventory Item</h2>
            
            <TextField
                fullWidth
                required
                margin="normal"
                name="name"
                label="Item Name"
                value={formData.name}
                onChange={handleChange}
            />

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Type</InputLabel>
                <Select
                    name="type"
                    value={formData.type}
                    label="Type"
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)}
                >
                    <MenuItem value="Tool">Tool</MenuItem>
                    <MenuItem value="Spare Part">Spare Part</MenuItem>
                    <MenuItem value="Material">Material</MenuItem>
                    <MenuItem value="Consumable">Consumable</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                required
                margin="normal"
                name="unit"
                label="Unit"
                value={formData.unit}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                required
                margin="normal"
                name="quantity_available"
                label="Quantity Available"
                type="number"
                value={formData.quantity_available}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                required
                margin="normal"
                name="min_stock_level"
                label="Minimum Stock Level"
                type="number"
                value={formData.min_stock_level}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                margin="normal"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
            >
                Add Item
            </Button>
        </Box>
    );
};

export default AddInventoryItem;