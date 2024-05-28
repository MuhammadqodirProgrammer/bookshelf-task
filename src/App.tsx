import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Provider as SnackbarProvider } from 'context/snackbar'
import { Provider as SearchBarProvider } from 'context/search'
import NotFoundContainer from 'modules/not-found/containers/not-found-container'

import * as ROUTES from './constants/routes'
import { ThemeProvider } from './context/theme'
import SignInContainer from './modules/auth/containers/signin-container'
import SignUpContainer from './modules/auth/containers/signup-container'
import { HomeContainer } from './modules/home/containers/home-container'
export enum AUTHORIZED_STATUS {
  YES = 'yes',
  NO = 'no'
}
function App () {
  const [isAuthorized, setIsAuthorized] = useState('' as AUTHORIZED_STATUS)
  const token = localStorage.getItem('book-token') || ''

  useEffect(() => {
    setIsAuthorized(token ? AUTHORIZED_STATUS.YES : AUTHORIZED_STATUS.NO)
  }, [token, isAuthorized])

  return (
    <SearchBarProvider>
      <SnackbarProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              {isAuthorized === AUTHORIZED_STATUS.NO && (
                <>
                  <Route path="*" element={<NotFoundContainer />} />
                  <Route path={ROUTES.HOME} element={<Navigate replace to={ROUTES.AUTHSIGNUP} />} />
                  <Route path={ROUTES.AUTHSIGN} element={<SignInContainer />} />
                  <Route path={ROUTES.AUTHSIGNUP} element={<SignUpContainer setIsAuthorized={setIsAuthorized} />} />
                </>
              )}
              {isAuthorized === AUTHORIZED_STATUS.YES && (
                <>
                  <Route path={ROUTES.HOME} element={<HomeContainer />} />
                  <Route path="*" element={<NotFoundContainer />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </SearchBarProvider>
  )
}

export default App
