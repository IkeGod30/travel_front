import React, { useState, useEffect } from 'react'
import { Descriptions } from 'antd'; 
import '../DetailProduct.css';


function ProductInfo(props) {
    const [Product, setProduct] = useState({})

    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

        const addToCarthandler = () => {
            props.addToCart(props.detail._id)   
         }

        //  function Delete() {
        //     alert('You are about to delete this item')
        //  }



  return (
    <div>
        <Descriptions title="Product Info">
            <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
            <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
            <Descriptions.Item label="View">{Product.views}</Descriptions.Item>
            <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
        </Descriptions>

            <br />
            <br />
            <br />

        <div className='productInfoDiv'>
            <button className='btn btn-outline-success btn-lg' size="large" shape="round" type="danger" 
                    onClick={addToCarthandler}      
            >
                    Add to Cart
            </button>
        </div>
        <div className='productInfoDiv'>
            {/* <button className='btn btn-outline-warning btn-lg del' size="large" shape="round" type="danger"
                    onClick={Delete} 
            
            >   
                    Delete Item      
            </button> */}
        </div>
    </div>
  )
}

export default ProductInfo
