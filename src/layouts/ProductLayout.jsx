import React from 'react'

export const ProductLayout = ({children}) => {
    return <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">{children}</div>;
}
