import React from 'react'
import { Card } from 'antd'
import { useLoad } from '../hooks/request'
import { productsList } from '../utilis/urls'
import FullPageLoader from '../components/Main/FullPageLoader'

function Products() {
    const productsLoad = useLoad({ url: productsList })
    const { response } = productsLoad
    const products = response && response?.products

    return (
        <>
            { <FullPageLoader/> ? (
                <h1>Loading....</h1>
            ) : (
                products?.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt='example' src={item.images[0]} />
                            }
                        ></Card>
                    )
                })
            )}
        </>
    )
}

export default Products
