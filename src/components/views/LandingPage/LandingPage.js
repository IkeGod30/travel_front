import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Card } from 'antd'; 
import ImageSlider from '../../Utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import { FaRocket } from 'react-icons/fa';
import './Landing.css';

const { Meta } = Card;

function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(12)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })


    useEffect(() => {
       const variables = {
        skip: Skip,
        limit: Limit
       }

        getProducts(variables)
    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
        .then(response => {
            if(response.data.success) {
                if(variables.onLoadMore) {
                    // setProducts([...Products, response.data.products])
                    setProducts(response.data.products) // Optional...replace with above

                } else {
                    setProducts(response.data.products)
                }

                // setProducts([...Products, response.data.products]) //Not working. Cause error in the loadMore button in Landing page
                setProducts(response.data.products) // Optional...replace with above

                setPostSize(response.data.postSize)

            } else {
                alert('Failed to fetch product data')
            }
        })
    
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            onLoadMore: true

        }
        getProducts(variables)
        setSkip(skip)     
    }
    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images }/></a>}   
            >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card> 
        </Col>
    } )

    const showFilteredResults = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(variables)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
        }
    }
    return array
}
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filters
        
        if(category === "price") {
           let priceValues = handlePrice(filters)
           newFilters[category] = priceValues
        } 
            showFilteredResults(newFilters)
            setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerms(newSearchTerm)
        getProducts(variables)

    }

    return (
        <div className='landingDiv'>
            <div className='landingDiv2'>
                <h1> Exciting Vacation Packages <FaRocket color="#662" size="30px" /> </h1>
                <br />
                <br />
            </div>

{/* Filter component by continents and prices... inside a column each */}
<Row gutter={[16, 16]}>
    <Col lg={12} xs={24}>
    <CheckBox
    list={continents} 
    handleFilters={filters => handleFilters(filters, "continents")}
/>
    </Col>

    <Col lg={12} xs={24}>
        <RadioBox
        list={price} 
        handleFilters={filters => handleFilters(filters, "price")}
/>
    </Col>
</Row>

<div className='searchDiv'>
    <SearchFeature 
        refreshFunction={updateSearchTerms}
    />
</div>


{/* If there are no entered products, show the text below */}

    {Products.length === 0 ?
    <div className='noProduct'>
                <h2> No products yet </h2>
    </div>  :
            <div>
                <Row gutter={[16, 16]}>
                    {Products.map((product, index) => {} )}
                    {renderCards}
                </Row>
            </div> 
        }
        <br /><br />

        {PostSize >= Limit && 

     <div className='loadMore'>
        <button className='btn btn-outline-primary btn-lg' onClick={onLoadMore}>Load More</button>
    </div>
        }   
        </div>
    )
}

export default LandingPage