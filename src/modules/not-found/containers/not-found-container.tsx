import * as ROUTES from 'constants/routes'

import NotFoundImage from 'assets/404.png'
import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import FlexBox from '../../../components/main/flexbox'
import { AuthLayout } from '../../../layout'

function NotFoundContainer () {
  const navigate = useNavigate()
  const handleReload = () => {
    window.location.reload()
  }
  return (
    <AuthLayout>
      <img src={NotFoundImage} alt="Not-Found" />
      <FlexBox spacing={2} sx={{ width: '720px', my: 2, px: 5 }} justify="center">
        <Button variant="contained" color="primary" onClick={() => navigate(ROUTES.HOME)} fullWidth>
          Go Home Page
        </Button>
        <Button variant="outlined" color="primary" onClick={handleReload} fullWidth>
          Reload Page
        </Button>
      </FlexBox>
    </AuthLayout>
  )
}

export default NotFoundContainer
