import React, {useState } from 'react'
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import './Utils.css';

function FileUpload(props) {
    const [Images, setImages] = useState([])
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
        header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
    
    Axios.post('/api/product/uploadImage', formData, config)
    .then(response => {
        if (response.data.success) { 
            setImages([...Images, response.data.image])
            props.refreshFunction([...Images, response.data.image])     
        } else {
            alert('Failed to save the image in the Server')    
        }
    })
    }

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images] 
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)
    }
  return (
    <div className='dropzoneDiv'>
        <Dropzone 
            onDrop={onDrop}
            multiple={false} 
            maxSize={800000000} 
        >
            {({getRootProps, getInputProps }) => (
                <div className='UploadDiv' 
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <a className='UploadAnchor'> Click to Add Product </a>
                </div>
            )}

        </Dropzone>
       
         <div className='ImgDiv'>
            {Images.map((image, index) =>  (
                <div onClick={() => onDelete(image)}>
                    <img className='ImgContent' src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                </div>
        ))}
        </div>
    </div>
      
  )
}

export default FileUpload