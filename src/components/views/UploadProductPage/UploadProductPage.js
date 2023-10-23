import React, {useState} from 'react';
import { Typography, Form, message, Input } from 'antd';
import Axios from 'axios';
import FileUpload from '../../Utils/FileUpload';
import './UploadProduct.css';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key: 1, value: "Africa"},
    {key: 2, value: "Europe"},
    {key: 3, value: "Asia"},
    {key: 4, value: "North America"},
    {key: 5, value: "South America"},
    {key: 6, value: "Australia"}
]

function UploadProductPage(props) {
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([]) 

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)   
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
            return alert('Please fill all the fields first')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,

        }
        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if(response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')

                } else {
                    alert('Failed to upload Product')
                }
            })
    }
  return (
    <div className='uploadProductDiv'>
        <div className='uploadProductDiv2'>
            <Title className='uploadTitle' level={2}> Upload Vacation Package</Title>
        </div>

{/* Drop Zone */}

    <Form onSubmit={onSubmit} >
        <FileUpload refreshFunction={updateImages}/>

        <br />
        <br />
        
        <label className='formLabel'>Title</label>
        <Input 
            onChange={onTitleChange}
            value={TitleValue}
        />

        <br />
        <br />
        <label className='formLabel'>Description</label>
    <TextArea 
        onChange={onDescriptionChange}
        value={DescriptionValue}
    />

        <br />
        <br />
        <label className='formLabel'>Price($)</label>
        <Input 
            onChange={onPriceChange} 
            value={PriceValue}
            type="number"
        />
        <br />
        <br />
        <select className='formLabel' onChange={onContinentsSelectChange}>
            { Continents.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>

            ))}
        </select>

        <br />
        <br />

        <button className='btn btn-outline-primary btn-lg'  
            onClick={onSubmit}    
        >
            Submit
        </button>
        </Form>
    </div>
  )
}

export default UploadProductPage