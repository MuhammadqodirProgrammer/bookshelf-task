import React from 'react'
import Logo from 'assets/logo.png'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { prop } from 'ramda'
import { Link } from 'react-router-dom'

import FlexBox from './flexbox'

import SearchField from '../form/searchfield'
import { useSearchContext } from '../../context/search'
import { useGetDetail } from '../../hooks/useGetDetail'
import { getUserDetail } from '../../modules/home/api/api'

function AppHeader () {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const getUser = useGetDetail(getUserDetail)
  const { setSearchValue } = useSearchContext()
  const response = prop('result', getUser)
  const data = prop('data', response)
  const email = prop('email', data)
  const name = prop('name', data)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSearch = (values: any) => {
    setSearchValue(values)
  }

  const handleLogOut = () => {
    const bookToken = localStorage.getItem('book-token')
    if (bookToken) {
      localStorage.setItem('book-token', '')
      location.reload()
    }
    handleCloseUserMenu()
  }

  return (
    <Container maxWidth="xl">
      <FlexBox flex justify="space-between">
        <FlexBox spacing={2}>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <SearchField
            name="title"
            initialValues={{}}
            onSubmit={handleSearch}
            placeholder="Search for any training you want "
          />
        </FlexBox>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Boss" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px', width: '100%' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Typography textAlign="center">{name}</Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center">{email}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </FlexBox>
    </Container>
  )
}

export default AppHeader
