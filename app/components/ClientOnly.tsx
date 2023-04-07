'use client'

import { FC, ReactNode, useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: ReactNode
}

export const ClientOnly: FC<ClientOnlyProps> = ({
  children,
}): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}
