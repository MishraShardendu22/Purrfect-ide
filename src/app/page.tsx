import { SignedIn, SignedOut, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <>
      <div>
<SignedOut>
  <SignUpButton>

  </SignUpButton>
</SignedOut>

<UserButton />

<SignedIn>
  <SignOutButton>

  </SignOutButton>
</SignedIn>
</div>
    </>
  )
}

export default page


