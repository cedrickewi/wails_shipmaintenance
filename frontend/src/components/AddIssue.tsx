import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { db } from '../../wailsjs/go/models';
import { AddShipIssue } from '../../wailsjs/go/db/DatabaseService';
import { toast } from 'react-toastify';

interface ShipIssueFormData {
  ship_id: number | string;
  reporter_id: number;
  reporter_name: string;
  issue_type: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  system_affected: string;
  started_date: Date;
  reported_date: Date;
  updated_date: Date;
  assigned_to: string;
}

const issueTypes = [
  'Mechanical', 'Electrical', 'Structural', 'Operational'
];

const severityLevels = [
  'Low',
  'Medium',
  'High',
  'Critical',
];

const statusOptions = [
  'Reported', 'Under Review', 'Approved', 'In Progress', 'Resolved', 'Closed'
];

type ShipInfo = {
  ship: db.Ship
  mechanics: db.ChiefMechanic[]
}

const ShipIssueForm: React.FC<ShipInfo> = ({ ship, mechanics }) => {
  const [formData, setFormData] = useState<ShipIssueFormData>({
    ship_id: ship.id,
    reporter_id: 0,
    reporter_name: '',
    issue_type: '',
    title: '',
    description: '',
    severity: '',
    status: '',
    system_affected: '',
    started_date: new Date(),
    reported_date: new Date(),
    updated_date: new Date(),
    assigned_to: '',
  });

  const [mechanicsNames, setMechanicsNames] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name: keyof ShipIssueFormData) => (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here
    const mechanic = mechanics.find(m => m.name === formData.reporter_name);
    if (mechanic) {

    } else {
      toast.error("Reporter not found");
      return;
    }

    const assigned_mechanic = mechanics.find(m => m.name === formData.assigned_to);
    if (!assigned_mechanic) {
      toast.error("Assigned mechanic not found");
      return;
    }
    const new_issue: db.ShipIssue = {
      issue_id: 0,
      ship_id: ship.id,
      reporter_id: mechanic.mechanic_id,
      issue_type: formData.issue_type,
      issue_title: formData.title,
      description: formData.description,
      issue_status: formData.status,
      reported_date: formData.reported_date.toLocaleDateString("en-US"),
      started_date: formData.started_date.toLocaleDateString("en-US"),
      system_affected: formData.system_affected,
      severity_level: formData.severity,
      assigned_to: assigned_mechanic.mechanic_id,
      updated_date: formData.updated_date.toLocaleDateString("en-US")
    }



    try {
      console.log(new_issue)
      await AddShipIssue(new_issue)
      setFormData({
        ship_id: ship.id,
        reporter_id: 0,
        reporter_name: '',
        issue_type: '',
        title: '',
        description: '',
        severity: '',
        status: '',
        system_affected: '',
        started_date: new Date(),
        reported_date: new Date(),
        updated_date: new Date(),
        assigned_to: '',
      })
      toast.success("Information Saved!!!")
    } catch (error) {
      toast.error("Error Add nwe issue to database")
      throw (error)
    }
  };

  // const mechanicsNames = useMemo(() => {
  //   return mechanics.map(m => m.name);
  // }, [mechanics]);

  useEffect(() => {
    const names = mechanics.map(mechanic => mechanic.name)
    setMechanicsNames(names)
  }, [])

  return (
    <Container sx={{ mt: 1, mb: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            {/* Reporter Name */}
            <Grid size={{ xs: 6, md: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Reporter</InputLabel>
                <Select
                  name="reporters"
                  value={formData.reporter_name}
                  label="Reporter"
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      reporter_name: e.target.value,
                    }));
                  }
                  }
                >
                  {mechanicsNames.map(name => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Issue Type */}
            <Grid size={{ xs: 6, md: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Issue Type</InputLabel>
                <Select
                  name="issue_type"
                  value={formData.issue_type}
                  label="Issue Type"
                  onChange={handleSelectChange}
                >
                  {issueTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Severity */}
            <Grid size={{ xs: 6, md: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Severity</InputLabel>
                <Select
                  name="severity"
                  value={formData.severity}
                  label="Severity"
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      severity: e.target.value,
                    }));
                  }}
                >
                  {severityLevels.map(level => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Title */}
            <Grid size={{ xs: 6, md: 12 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Description */}
            <Grid size={{ xs: 6, md: 12 }}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* System Affected */}
            <Grid size={{ xs: 6, md: 12 }}>
              <TextField
                fullWidth
                label="System Affected"
                name="system_affected"
                value={formData.system_affected}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Assigned To */}
            <Grid size={{ xs: 6, md: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Assigned To</InputLabel>
                <Select
                  name="assigned_to"
                  value={formData.assigned_to}
                  label="Assigned To"
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      assigned_to: e.target.value,
                    }));
                  }}
                >
                  {mechanicsNames.map(name => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid size={{ xs: 6, md: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleSelectChange}
                >
                  {statusOptions.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Fields */}
            <Grid size={{ xs: 6, md: 12 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Started Date"
                  value={formData.started_date}
                  onChange={handleDateChange('started_date')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 6, md: 12 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Reported Date"
                  value={formData.reported_date}
                  onChange={handleDateChange('reported_date')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 6, md: 8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button type="submit" variant="contained" size="large">
                  Submit Issue
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ShipIssueForm;