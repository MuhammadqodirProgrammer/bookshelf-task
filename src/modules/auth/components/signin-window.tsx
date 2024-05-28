import * as ROUTES from 'constants/routes'

import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import FlexBox from '../../../components/main/flexbox'
import TextField from '../../../components/form/textfield'
import withForm from '../../../components/form/with-form'
import PasswordTextField from '../../../components/form/password'

function SignInWindow () {
  const navigate = useNavigate()
  return (
    <Paper sx={{ py: 6, px: 3.5, width: '430px' }} variant="outlined">
      <FlexBox spacing={3} direction="column" align="center">
        <Typography variant="h3">Sign in</Typography>
        <FlexBox spacing={2} direction="column" align="center" sx={{ width: '100%' }}>
          <TextField label="Username" name="email" type="email" placeholder="Enter your email or username" />
          <PasswordTextField label="Password" name="password" placeholder="Password" />
        </FlexBox>
        <FlexBox direction="column" sx={{ width: '100%' }} spacing={2}>
          <Button color="primary" variant="contained" fullWidth={true} type="submit">
            Submit
          </Button>
          <Typography variant="body2">
            Don't have an account?
            <Button variant="text" color="primary" onClick={() => navigate(ROUTES.AUTHSIGNUP)}>
              Go to sign up.
            </Button>
          </Typography>
        </FlexBox>
      </FlexBox>
    </Paper>
  )
}

export default withForm(SignInWindow)
