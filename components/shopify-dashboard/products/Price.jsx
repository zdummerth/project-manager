import React from 'react'

const Price = ({ price = '' }) => {
    return (
        <span className=''>${`${parseFloat(price).toFixed(2)}`}</span>
    )
}

export default Price