import { Box } from "@mui/material"
// import { useIssueContext } from "@/context/IssueContext"
import { GetAllShipsLogReports } from "../../wailsjs/go/db/DatabaseService"
import { db } from "../../wailsjs/go/models"
import { useEffect, useState } from "react"
import IssuesTable from "@/components/IssuesTable"

export const Issues = () => {
    // const { logIssues } = useIssueContext()
    const [shipIssues, setShipIssues] = useState<db.LogIssueReport[]>([])
    const getForSingleShip = async () => {
        const response = await GetAllShipsLogReports()
        console.log(response)
        setShipIssues(response)
    }

    useEffect(() => {
        getForSingleShip()
    }, [])

    return (<Box>
        <h1>Issues</h1>
        <IssuesTable issues={shipIssues} />
    </Box>)
}