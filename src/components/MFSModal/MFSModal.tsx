import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
interface MFSModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function MFSModal({open, setOpen}: MFSModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Typography variant="h6" gutterBottom>🛠 Demo Credentials:</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
  
  
  <Typography gutterBottom>
    👤 <strong>User</strong> - Email: <code>sakib@gmail.com</code>, PIN: <code>11111</code>
  </Typography>

  <Typography gutterBottom>
    👤 <strong>Agent</strong> - Email: <code>sohan@gmail.com</code>, PIN: <code>22222</code>
  </Typography>

  <Typography gutterBottom>
    👨‍💼 <strong>Admin</strong> - Email: <code>admin@gmail.com</code>, PIN: <code>33333</code>
  </Typography>
</DialogContent>
        
      </BootstrapDialog>
    </React.Fragment>
  );
}
