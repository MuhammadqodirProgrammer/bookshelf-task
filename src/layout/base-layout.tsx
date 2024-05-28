import * as React from 'react'
import Box from '@mui/material/Box'

import FlexBox from '../components/main/flexbox'
import ImageBackground from '../assets/main-background.png'
import AppHeader from '../components/main/app-header'

interface Props {
  readonly children: React.ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${ImageBackground})`,
        backgroundRepeat: 'no-repeat',
        pb: 2
      }}
    >
      <AppHeader />
      <FlexBox align="center" flex justify="center" direction="column">
        {children}
      </FlexBox>
    </Box>
  )
}
