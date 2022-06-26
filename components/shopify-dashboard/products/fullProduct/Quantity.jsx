import React from 'react'
import styled from 'styled-components'
import { PlusCircle, MinusCircle } from '@styled-icons/boxicons-regular'
import LoadingIndicator from 'components/shared/LoadingIndicator';
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

  .size {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    width: 40px;
    height: 40px;
  }
`

const Quantity = ({ quantity, increase, decrease, className, disabled, loading }) => {
  return (
    <QuantityWrapper className={className}>
      <div>Qty:</div>
      <ControllWrapper>
        <button className='size' onClick={decrease} disabled={disabled}>
          <MinusCircle size='22' />
        </button>
        <div className='size'>
          {loading ? (
            <LoadingIndicator size={"22"} />
          ) : (
            <>
              {quantity}
            </>
          )}
        </div>
        {/* <input type="number" value={quantity} /> */}
        <button className='size' onClick={increase} disabled={disabled}>
          <PlusCircle size='22' />
        </button>
      </ControllWrapper>
    </QuantityWrapper>
  )
}


export default Quantity

