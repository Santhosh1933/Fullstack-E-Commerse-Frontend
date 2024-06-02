import React from 'react'
import { bannerImg } from '../../../Constant'

export const Banner = () => {
  return (
    <div className='w-full'>
        <img src={bannerImg} alt="" className='w-full h-[50vh] md:h-[70vh]'/>
    </div>
  )
}
