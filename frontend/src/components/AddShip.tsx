import React, { useState } from 'react';
import { db } from '../../wailsjs/go/models';
import { AddShip, GetShips } from '../../wailsjs/go/db/DatabaseService';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';


const shipType = [
    "Pilotine",
    "Dredger"
]

const current_status = [
    "active",
    "maintenance",
]   
 
const NewShip: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [ship, setShip] = useState<db.Ship>({
        id: 0,
        name: '',
        imo_number: '',
        gross_tonnage: 0,
        current_status: '',
        ship_type: '',
        year_built: new Date().getFullYear(),
        added_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
    });  


    const fieldMapping: { [key: string]: keyof db.Ship } = {
        yearBuilt: 'year_built',
        currentStatus: 'current_status',
        imoNumber: 'imo_number',
        grossTonnage: 'gross_tonnage',
        type: 'ship_type',
        name: 'name',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const fieldName = fieldMapping[name];
        if (fieldName) {
            setShip((prevShip) => ({
                ...prevShip,
                [fieldName]: fieldName === 'year_built' || fieldName === 'gross_tonnage' ? parseInt(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            await AddShip(ship)
            setShip({
                id: 0,
                imo_number: '',
                gross_tonnage: 0,
                current_status: '',
                name: '',
                ship_type: '',
                year_built: 0,
                added_date: new Date().toISOString(),
                updated_date: new Date().toISOString(),
            })
            await GetShips()
            toast.success('Ship added successfully!')
        } catch (error) {
            toast.error('Error adding ship: ' + error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white p-4 rounded shadow-md'>
            <ToastContainer />

            <h2 className='text-2xl font-bold mb-4'>Add New Ship</h2>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="name">Ship Name:</label>
                <Input type='text' name='name' value={ship.name} onChange={handleChange} required id='name' />

            </div>
            <div className='mb-4 flex flex-col'>
                <Grid size={{ xs: 6, md: 12 }}>
                    <FormControl fullWidth required>
                        <InputLabel>Ship Type</InputLabel>
                        <Select
                            name="ship_type"
                            value={ship.ship_type}
                            label="Ship Type"
                            onChange={(e) => {
                                setShip(prev => ({
                                    ...prev,
                                    ship_type: e.target.value
                                }))
                            }}
                        >
                            {shipType.map(type => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </div>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="yearBuilt">Year Built:</label>
                <Input type='number' id='yearBuilt' name='yearBuilt' value={ship.year_built} onChange={handleChange} required />
            </div>
            <div className='mb-4 flex flex-col'>
                <Grid size={{ xs: 6, md: 12 }}>
                    <FormControl fullWidth required>
                        <InputLabel>Current Status</InputLabel>
                        <Select
                            name="current_status"
                            value={ship.current_status}
                            label="Current Status"
                            onChange={(e) => {
                                setShip(prev => ({
                                    ...prev,
                                    current_status: e.target.value
                                }))
                            }}
                        >
                            {current_status.map(type => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </div>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="imoNumber">IMO Number:</label>
                <Input type='text' id='imoNumber' name='imoNumber' value={ship.imo_number} onChange={handleChange} required />
            </div>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="grossTonnage">Gross Tonnage:</label>
                <Input type='number' id='grossTonnage' name='grossTonnage' value={ship.gross_tonnage} onChange={handleChange} required />
            </div>
            <Button type='submit'>{loading ? "loading" : "Add Ship"}</Button>
        </form>
    );
};

export default NewShip;