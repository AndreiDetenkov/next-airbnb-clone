'use client'

import { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }): JSX.Element => {
  return <div className="m-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">{children}</div>
}
