import React from 'react'

export const CategoryListingLayout = ({ children }) => {
  return (
    <div className="flex w-full overflow-scroll gap-6 rm-scrollbar">{ children }</div>
  )
}
