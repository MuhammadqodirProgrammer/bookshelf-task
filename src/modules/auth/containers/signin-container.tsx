import React from 'react'

import { AuthLayout } from '../../../layout'
import SignInWindow from '../components/signin-window'

function SignInContainer () {
  const handleSubmit = (values: any) => {
    console.log(values)
  }
  return (
    <AuthLayout>
      <SignInWindow initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} />
    </AuthLayout>
  )
}

export default SignInContainer
