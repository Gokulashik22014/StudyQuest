import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <h1>Hey the layout is working</h1>
        {children}
    </div>
  )
}

export default AuthLayout