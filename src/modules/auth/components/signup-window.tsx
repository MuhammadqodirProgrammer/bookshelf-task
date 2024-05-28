import * as ROUTES from 'constants/routes'

import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import FlexBox from '../../../components/main/flexbox'
import TextField from '../../../components/form/textfield'
import withForm from '../../../components/form/with-form'
import PasswordTextField from '../../../components/form/password'

function SignUpWindow () {
  const navigate = useNavigate()
  return (
    <Paper sx={{ py: 6, px: 3.5, width: '430px' }} variant="outlined">
      <FlexBox direction="column" align="center" spacing={3}>
        <Typography variant="h3">Sign up</Typography>
        <FlexBox direction="column" spacing={1} align="center" sx={{ width: '100%' }}>
          <TextField label="Username" name="name" placeholder="Enter your name or username" />
          <TextField label="User email" name="email" placeholder="Enter your email" />
          <PasswordTextField label="Your key" name="key" placeholder="Enter your key" />
          <PasswordTextField label="Your secret" name="secret" placeholder="Enter your secret" />
        </FlexBox>
        <FlexBox direction="column" sx={{ width: '100%' }} spacing={2}>
          <Button color="primary" variant="contained" fullWidth={true} type="submit">
            Submit
          </Button>
          <Typography variant="body2">
            Already signed up?
            <Button variant="text" color="primary" onClick={() => navigate(ROUTES.AUTHSIGN)}>
              Go to sign in.
            </Button>
          </Typography>
        </FlexBox>
      </FlexBox>
    </Paper>
  )
}

export default withForm(SignUpWindow)
