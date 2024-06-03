import { Button, ConfigProvider } from 'antd'
import React from 'react'

export const CustomButton = ({name="Button"}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#fa6607",
            colorPrimaryHover: "#fb7520",
            colorPrimaryActive:"#fa6607" ,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" className='w-full'>
        {name}
      </Button>
    </ConfigProvider>
  )
}
