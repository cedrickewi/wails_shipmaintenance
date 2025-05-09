import { ReactNode, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

type ButtonWithPopupProps = {
  buttonLabel: string;
  dialogTitle?: string;
  children: ReactNode;
};

export default function ButtonWithPopup({ buttonLabel, dialogTitle, children }: ButtonWithPopupProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {buttonLabel}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
        
        <DialogContent dividers>
          {children}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
