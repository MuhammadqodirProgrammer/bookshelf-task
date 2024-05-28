import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import withForm from 'components/form/with-form'
import { Button, Typography } from '@mui/material'
import FlexBox from 'components/main/flexbox'
import CancelIcon from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'

import TextField from '../../../components/form/textfield'

interface Props {
  readonly open: boolean
  readonly handleClose: () => void
  readonly loading: boolean
  readonly form: any
}

function BookAddDialogue ({ open, handleClose, loading, form }: Props) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>
        <FlexBox justify="space-between">
          <Typography variant="h6">Create book</Typography>
          <IconButton onClick={handleClose}>
            <CancelIcon />
          </IconButton>
        </FlexBox>
      </DialogTitle>
      <DialogContent>
        <TextField label="ISBN" name="isbn" placeholder="ISBN" />
      </DialogContent>
      <DialogActions sx={{ px:3 }}>
        <Button onClick={handleClose} variant="outlined" fullWidth={true}>
          Close
        </Button>
        <Button onClick={form.handleSubmit} variant="contained" fullWidth={true} disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withForm(BookAddDialogue)
