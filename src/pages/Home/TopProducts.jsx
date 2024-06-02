import React from 'react'
import { TopProductLayout } from '../../layouts/TopProduct.layout'

export const TopProducts = () => {
  return (
    <div>
      <div className="container py-8">
        <h1 className='text-xl font-semibold tracking-wider text-orange'>Top Selling Products</h1>
        <TopProductLayout>
            
        </TopProductLayout>
      </div>
    </div>
  )
}
