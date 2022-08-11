import React, { useEffect, useState } from 'react'
import { AppstoreOutlined, HomeOutlined, ShoppingCartOutlined, AppstoreAddOutlined, UnorderedListOutlined, ApartmentOutlined} from '@ant-design/icons';
import {  Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utilis/routes';
import { Routes, Route } from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'

const { Sider } = Layout;

function Main() {
  const sideNavData = [
    {
      id: 1,
      icon: HomeOutlined,
      name: 'Home',
      path: '/'
    },
    {
      id: 2,
      icon: AppstoreOutlined,
      name: 'Products',
      path: 'products'
    },
    {
      id: 3,
      icon: AppstoreAddOutlined,
      name: 'Product add',
      path: 'product-add'
    },
    {
      id: 4,
      icon: UnorderedListOutlined,
      name: 'Categories',
      path: 'categories'
    },
    {
      id: 5,
      icon: ApartmentOutlined,
      name: 'Attributes',
      path: 'attributes'
    },
    {
      id: 6,
      icon: ShoppingCartOutlined,
      name: 'Orders',
      path: 'orders'
    }
  ]
  const [activeNav, setActiveNav] = useState('1')
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    for (const item of sideNavData) {
      if (item.path === location.pathname) {
        setActiveNav([`${item.id}`])
      }
    }

    if (location.pathname === './login') {
      navigate('./')
    }
  }, [location])
 
  console.log(activeNav)

  const items2 = sideNavData.map((item, index) => {
      return {
        key:item.id,
        icon: React.createElement(item.icon),
        label: <Link to ={item.path}>{item.name}</Link>,
      }
    })
  return (
    <div className='main'>
        <Layout style={{ height:'100vh' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={activeNav}
            // selectedKeys={activeNav}
            style={{ height: '100%' }}
            items={items2}
          /> 
        </Sider>
        <Content
          style={{ padding: '0 24px', minHeight: 280 }}
        >

          <Routes>
            {
              routes.map((route) => {
                return (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={route.component}
                  />
                )
              })
            }
          </Routes>
        </Content>
      </Layout>
    </div>
  )
}

export default Main