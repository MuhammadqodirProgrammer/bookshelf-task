import React from 'react'
import Box from '@mui/material/Box'

interface Props {
  readonly children: React.ReactNode
  readonly space?: number
}

export function Wrapper ({ children, space = 5 }: Props) {
  return <Box py={space}>{children}</Box>
}
