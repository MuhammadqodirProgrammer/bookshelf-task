import React, { ReactNode } from 'react'
import FlexBox from 'components/main/flexbox'
import { Box, Chip, Paper, Typography } from '@mui/material'
import { always, cond, equals } from 'ramda'

interface Props {
  readonly book: any
  readonly status: number
  readonly actions: () => ReactNode
}

type ColorStatus = 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning'

const getStatusLabel = cond([
  [equals(0), always('NEW')],
  [equals(1), always('READING')],
  [equals(2), always('FINISHED')]
])

const getStatusColor = cond([
  [equals(0), always('error')],
  [equals(1), always('warning')],
  [equals(2), always('success')]
])

export const BookCard = ({ book, status, actions }: Props) => {
  const statusLabel = getStatusLabel(status)
  const statusColor = getStatusColor(status) as ColorStatus
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        width: '400px'
      }}
    >
      <FlexBox direction="column" spacing={2} align="flex-start">
        <Box sx={{ width: '100%' }}>
          <FlexBox justify="space-between">
            <Typography variant="h6" noWrap>
              {book?.title}
            </Typography>
            {statusLabel && actions && <Box>{actions()}</Box>}
          </FlexBox>
          <Typography variant="body2" noWrap={true}>
            Cover: {book?.cover}
          </Typography>
          <Typography variant="body2">Pages: {book?.pages}</Typography>
          <Typography variant="body2">Published: {book?.published}</Typography>
          <Typography variant="body2">Isbn: {book?.isbn}</Typography>
        </Box>
        <FlexBox direction="row" align="center" justify="space-between" sx={{ width: '100%' }}>
          <Typography variant="body1" sx={{ fontWeight:'500' }}>
            {book?.author} / {book?.published}
          </Typography>
          {Boolean(statusLabel) && <Chip label={statusLabel} color={statusColor} />}
        </FlexBox>
      </FlexBox>
    </Paper>
  )
}
