import React, { ReactNode } from 'react'
import { Stack } from '@mui/material'
import { ResponsiveStyleValue } from '@mui/system'

interface Props {
  readonly justify?: ResponsiveStyleValue<
    'start' | 'space-around' | 'space-evenly' | 'space-between' | 'center' | 'flex-end'
  >
  readonly align?: ResponsiveStyleValue<'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'>
  readonly direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>
  readonly wrap?: boolean
  readonly gap?: boolean
  readonly sx?: object
  readonly className?: string
  readonly flex?: boolean
  readonly children: ReactNode
  readonly divider?: React.ReactNode
  readonly spacing?: number | string
  readonly useFlexGap?: boolean
}

function FlexBox ({
  justify,
  align = 'center',
  gap,
  children,
  spacing,
  direction = 'row',
  wrap,
  className,
  flex,
  divider,
  sx,
  ...props
}: Props) {
  return (
    <Stack
      useFlexGap={gap}
      divider={divider}
      spacing={spacing}
      alignItems={align}
      direction={direction}
      justifyContent={justify}
      flexWrap={wrap ? 'wrap' : undefined}
      sx={{
        flex: flex ? '1 1' : '',
        ...sx
      }}
      {...props}
      className={className}
    >
      {children}
    </Stack>
  )
}

export default FlexBox
