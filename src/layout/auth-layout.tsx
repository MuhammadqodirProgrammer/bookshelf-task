import * as React from 'react'
import ImageBackground from 'assets/main-background.png'

import FlexBox from '../components/main/flexbox'
interface Props {
  readonly children: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <FlexBox
        align="center"
        flex
        justify="center"
        direction="column"
        sx={{ minHeight: '100vh', backgroundImage: `url(${ImageBackground})`, backgroundRepeat: 'no-repeat' }}
      >
        {children}
      </FlexBox>
    </>
  )
}
