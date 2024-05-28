import React, { ReactNode, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import MUISnackbar from '@mui/material/Snackbar'
import Alert, { alertClasses } from '@mui/material/Alert'
import { styled } from '@mui/material'

import Context from './context'

export const ALTER_SUCCESS = 'success'
export const ALTER_INFO = 'info'
export const ALTER_WARNING = 'warning'
export const ALTER_ERROR = 'error'
export const DURATION = 3000

const initialState = {
  open: false,
  type: ALTER_SUCCESS,
  duration: DURATION,
  message: null
}

const AlertStyled = styled(Alert)({
  border: 'none',
  [`& .${alertClasses.action} button`]: {
    color: 'inherit'
  }
})

const reducer = (state: any, action: any) => {
  if (action.type === 'open') {
    const { payload } = action

    return { ...state, type: ALTER_SUCCESS, ...payload, open: true }
  }

  if (action.type === 'close') {
    return {
      ...state,
      open: false
    }
  }

  return state
}

export const useSnackbar = () => {
  const { handleOpen } = useContext(Context) as any
  return handleOpen
}

export function Provider ({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOpen = (payload: any) => {
    dispatch({ type: 'open', payload })
  }

  const handleClose = () => {
    dispatch({ type: 'close' })
  }

  return (
    <Context.Provider value={{ handleOpen, handleClose }}>
      {children}
      <MUISnackbar
        open={state.open}
        onClose={handleClose}
        autoHideDuration={state.duration}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <AlertStyled variant="filled" onClose={handleClose} severity={state.type}>
          {state.message}
        </AlertStyled>
      </MUISnackbar>
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export default Provider
