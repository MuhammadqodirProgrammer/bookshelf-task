import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

import TextField from './textfield'

interface CustomTextFieldProps {
  name: string
  label: string
  placeholder: string
  fullWidth?: boolean
}

const PasswordTextField: React.FC<CustomTextFieldProps> = ({ name, label, placeholder, fullWidth = true }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <TextField
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default PasswordTextField
