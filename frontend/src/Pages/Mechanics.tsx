import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import ButtonWithPopup from "@/components/ButtonWithPopup";
import { Box, MenuItem } from "@mui/material";
import { useShipContext } from "@/context/ShipContext";
import { useMechanicContext } from "@/context/MechanicContext";
import { AddMechanic, AssignMechanicToShip } from "../../wailsjs/go/db/DatabaseService";
import { db } from "../../wailsjs/go/models";
import { toast } from "react-toastify";

export const Mechanics = () => {

    const { mechanics } = useMechanicContext()

    return (<Box>
        <ButtonWithPopup buttonLabel="Add Mechanic" dialogTitle="Add New Mechanic"><AddMechanicForm /></ButtonWithPopup>
        <Box height={30} />
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Specialization</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Added Date</TableCell>
                        <TableCell>Assign to Ship</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mechanics.map((mechanic, key) => (<TableRow key={key + 1}>
                        <TableCell>{mechanic.name}</TableCell>
                        <TableCell>{mechanic.phone}</TableCell>
                        <TableCell>{mechanic.specialization}</TableCell>
                        <TableCell>{mechanic.role}</TableCell>
                        <TableCell>{mechanic.added_date}</TableCell>
                        <TableCell>
                            <ButtonWithPopup buttonLabel="Assign" dialogTitle="Assign Mechanic to Ship">
                                <AssignToShipForm mechanicId={3} />
                            </ButtonWithPopup></TableCell>
                    </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>)
}

export const AddMechanicForm = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        specialization: "",
        role: "",
        addedDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const cfMec: db.ChiefMechanic = {
                mechanic_id: 0,
                name: formData.name,
                phone: formData.phone,
                specialization: formData.specialization,
                role: formData.role,
                added_date: "",
                updated_date: ""
            }
            await AddMechanic(cfMec)
            toast.success("Mechanic Added Successfully")
            setFormData({
                name: "",
                phone: "",
                specialization: "",
                role: "",
                addedDate: "",
            })

        } catch (error) {
            toast.error("error adding new Mechanic")
        } finally {
            setLoading(false)
        }

        // Add logic to save the mechanic data
    };

    return (
        <Box mt={4}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 12 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 12 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 12 }}>
                        <TextField
                            fullWidth
                            label="Specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 12 }}>
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 12 }}>
                        <Button type="submit" variant="contained" color="primary">
                            {loading ? "Loading..." : "Add Mechanic"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};



export const AssignToShipForm = ({ mechanicId }: { mechanicId: number }) => {
    const [shipName, setShipName] = useState("");
    const { ships } = useShipContext();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(ships);

        const ship = ships.find(s => s.name.trim() === shipName.trim());

        console.log(ship)
        if (ship) {
        } else {
            toast.error("Ship not found")
            return
        }

        try {  
            setLoading(true)
            await AssignMechanicToShip(ship.id, mechanicId)
            toast.success(`Assigned Succesfully ${ship.name} to mechanic`)
            setShipName("")
        } catch (error) {
            toast.error("error adding mechanic to ship")
            throw (error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    label="Select Ship"
                    value={shipName}
                    onChange={(e) => {
                        setShipName(e.target.value)
                    }}
                    fullWidth
                    required
                >
                    {ships.map((ship) => (
                        <MenuItem key={ship.id} value={ship.name}>
                            {ship.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Box mt={2}>
                    <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                        {loading ? "Loading ..." : "Assign"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};