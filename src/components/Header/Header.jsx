import { PageHeader, Image, Select } from 'antd'
import React from 'react'
import logo from '../../assets/images/logo.png'

const { Option } = Select;

function Header() {
  return (
    <>
      <PageHeader
        className='header'
       title={ <Image
        width={150}
          src={logo}
         preview={false}
         extra={
            <Select defaultValue="Uzbek" style={{ width: 120 }} >
              <Option value="uz">Uzbek</Option>
              <Option value="ru">Rus</Option>
          </Select>
         }
      />}
     />
    </>
  )
}

export default Header 