import React from 'react'
import styled from 'styled-components'
import { PlusCircle, MinusCircle } from '@styled-icons/boxicons-regular'
import { colors } from 'styles';

const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;

    h3 {
      margin-right: 20px;
    }
`

const ControllWrapper = styled.div`
  display: flex;
  margin-left: 15px;


  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: none;
    border-radius: 50%;
    padding: 0;
    color: inherit;

    :hover {
      cursor: pointer;
    }
  }

  div {
      font-size: 18px;
      margin-right: 10px;
      margin-left: 10px;
      color: inherit;
  }

  .size {
    font-size: 22px;
  }
`

const Quantity = ({ quantity, increase, decrease, className }) => {
  return (
    <QuantityWrapper className={className}>
      <div>Qty:</div>
      <ControllWrapper>
        <button className='size' onClick={decrease}>
          <MinusCircle size='22' />
        </button>
        <div className='size'>{quantity}</div>
        {/* <input type="number" value={quantity} /> */}
        <button className='size' onClick={increase}>
          <PlusCircle size='22' />
        </button>
      </ControllWrapper>
    </QuantityWrapper>
  )
}


export default Quantity

