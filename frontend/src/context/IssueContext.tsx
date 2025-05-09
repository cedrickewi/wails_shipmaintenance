import { db } from "wailsjs/go/models";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GetAllShipsLogReports } from "../../wailsjs/go/db/DatabaseService";


interface IssueContextType {
    logIssues: db.LogIssueReport[];
    setLogIssues: (issues: db.LogIssueReport[]) => void;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logIssues, setLogIssues] = useState<db.LogIssueReport[]>([]);

    const getAllIssues = async () => {
        const issuesData = await GetAllShipsLogReports()
        setLogIssues(issuesData)
    }

    useEffect(() => {
        getAllIssues()
    }, [])
    return (
        <IssueContext.Provider value={{ logIssues, setLogIssues }}>
            {children}
        </IssueContext.Provider>
    );
};

export const useIssueContext = (): IssueContextType => {
    const context = useContext(IssueContext);
    if (!context) {
        throw new Error("useIssueContext must be used within an IssueProvider");
    }
    return context;
};