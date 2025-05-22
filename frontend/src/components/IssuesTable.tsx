import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../../wailsjs/go/models';
import ButtonWithPopup from './ButtonWithPopup';
import WorkOrderForm from './WorkOrderForm';
import { useNavigate } from 'react-router-dom';


interface IssuesTableProps {
    issues: db.LogIssueReport[]
}

const IssuesTable = ({ issues }: IssuesTableProps) => {
    const [selectedIssue, setSelectedIssue] = useState<db.LogIssueReport | null>(null);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const handleRowClick = (issue: db.LogIssueReport) => {
        setSelectedIssue(issue);
        setOpen(true);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="issues table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue ID</TableCell>
                            <TableCell>Ship Name</TableCell>
                            <TableCell>Issue Description</TableCell>
                            <TableCell>Mechanic</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Add OTP</TableCell>
                            <TableCell>Print <PrintIcon /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {issues.map((issue) => (
                            <TableRow
                                key={issue.log_id}
                                onClick={() => handleRowClick(issue)}
                                hover
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{issue.issue_id}</TableCell>
                                <TableCell>{issue.ship_name}</TableCell>
                                <TableCell sx={{ maxWidth: "200px" }}>{issue.issue_description}</TableCell>
                                <TableCell>{issue.mechanic_name}</TableCell>
                                <TableCell>{issue.completion_date ? 'Completed' : 'Pending'}</TableCell>
                                <TableCell onClick={(event) => {
                                    event.stopPropagation()
                                }}>
                                    <ButtonWithPopup buttonLabel='ADD WORK ORDER' dialogTitle='WORK ORDER FORM'>
                                        <WorkOrderForm issue={issue} key={issue.issue_id} />
                                    </ButtonWithPopup>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={(event) => {
                                        event.stopPropagation();
                                        // Handle print action here
                                        console.log("Print issue ID:", issue.issue_id);
                                        navigate(`${issue.issue_id}`);   
                                    }}>
                                        <PrintIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
                <DialogTitle>Issue Details</DialogTitle>
                <DialogContent>
                    {selectedIssue && (
                        <div>
                            <h3>Issue #{selectedIssue.issue_id}</h3>
                            <p><strong>Description:</strong> {selectedIssue.issue_description}</p>
                            <p><strong>Ship:</strong> {selectedIssue.ship_name} (ID: {selectedIssue.ship_id})</p>
                            <p><strong>Mechanic:</strong> {selectedIssue.mechanic_name}</p>
                            <p><strong>Controller:</strong> {selectedIssue.controller_name}</p>
                            <p><strong>Action Taken:</strong> {selectedIssue.action_taken}</p>
                            <p><strong>Parts Replaced:</strong> {selectedIssue.parts_replaced}</p>
                            <p><strong>Hours Spent:</strong> {selectedIssue.hours_spent}</p>
                            <p><strong>Completion Date:</strong> {selectedIssue.completion_date}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default IssuesTable;