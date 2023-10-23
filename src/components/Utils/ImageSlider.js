import React from 'react'
import { Carousel } from 'antd'
import './Utils.css';

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
            <div key={index}>
                <img className='ImgSlider' src={`http://localhost:5000/${image}`} alt={"productImage"} />
            </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
