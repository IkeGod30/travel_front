const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },

    {
        "_id": 2,
        "name": "Europe"
    },

    {
        "_id": 3,
        "name": "Asia"
    },

    {
        "_id": 4,
        "name": "North America"
    },

    {
        "_id": 5,
        "name": "South America"
    },

    {
        "_id": 6,
        "name": "Australia"
    }


]


const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []

    },
    {
        "_id": 1,
        "name": "$0 to $1000",
        "array": [0, 1000]

    },


    {
        "_id": 2,
        "name": "$1001 to $3000",
        "array": [1001, 3000]

    },

    {
        "_id": 3,
        "name": "$3001 to $4000",
        "array": [3001, 4000]

    },

    {
        "_id": 4,
        "name": "$4001 to $5000",
        "array": [4001, 5000]

    },

    {
        "_id": 5,
        "name": "More than $5000",
        "array": [5001, 1500000]

    }
]

export {
    price,
    continents
}