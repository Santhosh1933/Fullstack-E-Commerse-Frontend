import React from 'react'

export const Price = ({children,className=""}) => {
  return (
    <div className={className}>₹{children}</div>
  )
}
