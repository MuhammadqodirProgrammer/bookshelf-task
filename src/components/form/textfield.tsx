import React from 'react'
import { useField } from 'formik'
import { BaseTextFieldProps, FormControlLabel } from '@mui/material'
import MUITextField from '@mui/material/TextField'

interface Props extends BaseTextFieldProps {
  readonly inputVariant?: string
  readonly InputProps?: any
  readonly name?: string
  readonly label?: string
  readonly placeholder: string
}

function TextField ({ name, label, placeholder, ...props }: Props) {
  const [field, meta] = useField(name || '')

  return (
    <FormControlLabel
      control={
        <MUITextField
          {...props}
          {...field}
          color="error"
          variant="outlined"
          placeholder={placeholder}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          // @ts-ignore
          onWheel={(e) => e.target.blur()}
          sx={{ width: '100%' }}
        />
      }
      label={label}
      labelPlacement="top"
      sx={{ width: '100%' }}
    />
  )
}

export default TextField
