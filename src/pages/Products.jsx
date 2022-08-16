import React, { useState } from 'react'
import { Button, Image, PageHeader, Space, Table, message, Modal } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useDeleteRequest, useLoad } from '../hooks/request'
import { productDelete, productsList } from '../utilis/urls'
import FullPageLoader from '../components/Main/FullPageLoader'

const initialDeleteModalState = {
    active: false,
    loading: false,
    id:null,
}
function Products() {
    const [deleteModal, setDeleteModal] = useState(initialDeleteModalState)
    const productsLoad = useLoad({ url: productsList })
    const { loading, response } = productsLoad
    const products = response && response?.products
    const deleteProductRequest = useDeleteRequest({url:productDelete.replace('id', deleteModal.id),})


    async function productDeleteBtn() {
        setDeleteModal({...deleteModal, loading:true})
         const { success, response } = await deleteProductRequest.request()
         if (success) {
           setDeleteModal(initialDeleteModalState)
           productsLoad.request()
           message.success('Product o`chirildi')
         } else {
            setDeleteModal(initialDeleteModalState)
            message.error(response.data.message)
         }
      }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key:'id',
        },
        {
            title: 'Img',
            dataIndex: 'image',
            render:(item)=> <Image width={100} src={item}/>,
            key:'images',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key:'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key:'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key:'status',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key:'qty',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (item) => (
                <Space>
                    <Button> <EditOutlined/> </Button>
                    <Button type='danger' onClick={() => setDeleteModal({
                        ...deleteModal,
                        active: true,
                        id:item.id,
                    })}> <DeleteOutlined/> </Button>
                    <a href='/' target='blank'><Button> <EyeOutlined/> </Button></a>
                </Space>
            )
        },
    ]

    return (
        <>
            <PageHeader title="Products" extra={<Button>Add Products</Button>} />
            
            <Modal title="Productni o`chirishni xohlaysizmi?"
          visible={deleteModal.active}
          onOk={productDeleteBtn}
          confirmLoading={deleteModal.loading}
          onCancel={() => {
                 setDeleteModal({...deleteModal, id:null, active:false})
          }}>
            </Modal>
            
            { loading ? (
                    <FullPageLoader/>
            ) : (
                    products && (
                        <Table
                            dataSource={products?.map((item) => ({
                                key: item.id,
                                id: item.id,
                                image: item?.images?.shift(),
                                name: item.name_uz,
                                price: item.price,
                                status: item.status,
                                qty: item.quantity,
                                action: item,
                            }))}
                            columns={columns}
                        />
                    )
                )
           }
        </>
    )
            
        
}

export default Products
