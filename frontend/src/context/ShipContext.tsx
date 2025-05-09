import React, { createContext, ReactNode, useContext, useState } from "react";
import { db } from "wailsjs/go/models";


interface ShipContextType {
    ships: db.Ship[]
    setShips: (ships: db.Ship[]) => void
}

const ShipContext = createContext<ShipContextType | undefined>(undefined)

export const ShipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ships, setShips] = useState<db.Ship[]>([])

    return (
        <ShipContext.Provider value={{ setShips, ships }} >{children}</ShipContext.Provider>
    )
}

export const useShipContext =(): ShipContextType => {
    const context = useContext(ShipContext)
    if (!context) {
        throw new Error('useShipsContext must be used within a ShipProvider');
    }
    return context
}