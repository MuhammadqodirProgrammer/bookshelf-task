import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  readonly book: any
  readonly onDelete: (id: number) => void
  readonly status: number
  readonly handleStatus: (id: number, book: any, status: number) => void
}

function BookActionRowMenu ({ book, onDelete, handleStatus, status }: Props) {
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState(null)

  const anchorIsOpen = Boolean(optionsAnchorEl)
  const { id } = book
  const handleOpenOptions = (event: any) => {
    setOptionsAnchorEl(event.currentTarget)
  }

  const handleCloseOptions = () => {
    setOptionsAnchorEl(null)
  }

  return (
    <React.Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorIsOpen ? 'long-menu' : undefined}
        aria-expanded={anchorIsOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenOptions}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="table-item-menu"
        MenuListProps={{ 'aria-labelledby': 'long-button' }}
        anchorEl={optionsAnchorEl}
        open={anchorIsOpen}
        onClose={handleCloseOptions}
      >
        { status === 0
          ? (
            <>
              <MenuItem
                onClick={() => {
                  handleStatus(id, book, 1)
                  handleCloseOptions()
                }}
              >
              To Reading
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleStatus(id, book, 2)
                  handleCloseOptions()
                }}
              >
              To Finished
              </MenuItem>
            </>
          )
          : status === 1
            ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleStatus(id, book, 0)
                    handleCloseOptions()
                  }}
                >
              To New
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleStatus(id, book, 2)
                    handleCloseOptions()
                  }}
                >
              To Finished
                </MenuItem>
              </>
            )
            : (
              <>
                <MenuItem
                  onClick={() => {
                    handleStatus(id, book, 0)
                    handleCloseOptions()
                  }}
                >
              To New
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleStatus(id, book, 1)
                    handleCloseOptions()
                  }}
                >
              To Reading
                </MenuItem>
              </>
            )}
        <MenuItem
          onClick={() => {
            onDelete(id)
            handleCloseOptions()
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default BookActionRowMenu
