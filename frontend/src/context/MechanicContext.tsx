import React, { createContext, useContext, useState, ReactNode } from 'react';
import { db } from 'wailsjs/go/models';


  
interface MechanicContextType {
    mechanics: db.ChiefMechanic[];
    setMechanics: (mechanics: db.ChiefMechanic[]) => void;
}

const MechanicContext = createContext<MechanicContextType | undefined>(undefined);

export const MechanicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mechanics, setMechanics] = useState<db.ChiefMechanic[]>([]);

    return (
        <MechanicContext.Provider value={{ mechanics, setMechanics }}>
            {children}
        </MechanicContext.Provider>
    );
};

export const useMechanicContext = (): MechanicContextType => {
    const context = useContext(MechanicContext);
    if (!context) {
        throw new Error('useMechanicContext must be used within a MechanicProvider');
    }
    return context;
};