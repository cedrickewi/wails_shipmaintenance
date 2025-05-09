import NewShip from "@/components/AddShip"
import { Box, Table, TableBody, TableCell, TableHead, TableRow, } from "@mui/material"
import { useEffect, useState } from "react"
import { GetShips, GetMechanics } from "../../wailsjs/go/db/DatabaseService"
import { db } from "wailsjs/go/models"
import ButtonWithPopup from "@/components/ButtonWithPopup"
import ShipIssueForm from "@/components/AddIssue"
import { useMechanicContext } from "@/context/MechanicContext"
import { Button } from "@/components/ui/button"
import { useShipContext } from "@/context/ShipContext"

export const Ship = () => {
    const [ships, setShiped] = useState<db.Ship[]>([])
    const { setMechanics, mechanics } = useMechanicContext()

    const { setShips } = useShipContext()

    const getShips = async () => {  
        try {
            const ships = await GetShips()
            setShips(ships)
            setShiped(ships)
            const mechanicsDB = await GetMechanics()
            setMechanics(mechanicsDB)
        } catch (error) {

        }
    }

    useEffect(() => {
        getShips()
    }, [])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <ButtonWithPopup buttonLabel="Add Ship" dialogTitle="Add New Ship" >
                    <NewShip />
                </ButtonWithPopup>
                <Button style={{}} onClick={getShips}>Refresh</Button>
            </div>

            {/* Display All Ships on a table */}
            {ships && ships.length > 0 ? <Box sx={{
                height: 600,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '10px'
                }

            }}> <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>IMO Number</TableCell>
                            <TableCell>Ship Type</TableCell>
                            <TableCell>Gross Tonnage</TableCell>
                            <TableCell>Year Built</TableCell>
                            <TableCell>Current Status</TableCell>
                            <TableCell>Added At</TableCell>
                            <TableCell>Add Issue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ships.map((ship, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{ship.name}</TableCell>
                                <TableCell>{ship.imo_number}</TableCell>
                                <TableCell>{ship.ship_type}</TableCell>
                                <TableCell>{ship.gross_tonnage}</TableCell>
                                <TableCell>{ship.year_built}</TableCell>
                                <TableCell>{ship.current_status}</TableCell>
                                <TableCell>{ship.added_date.slice(0, 10)}</TableCell>
                                <TableCell><ButtonWithPopup buttonLabel="Add Issue" dialogTitle="Declare Ship Issue"><ShipIssueForm ship={ship} mechanics={mechanics} /></ButtonWithPopup></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table></Box> :
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>IMO Number</TableCell>
                            <TableCell>Ship Type</TableCell>
                            <TableCell>Gross Tonnage</TableCell>
                            <TableCell>Year Built</TableCell>
                            <TableCell>Current Status</TableCell>
                            <TableCell>Added At</TableCell>
                            <TableCell>Add Issue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow><TableCell>No Ships Added </TableCell></TableRow>
                    </TableBody>
                </Table>}
        </>
    )
}  