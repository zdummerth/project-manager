import React from 'react'
import styled, { keyframes } from 'styled-components'
import Flex from 'components/shared/Flex'


const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  border-top: 4px solid white;
  border-right: 4px solid white;
  border-bottom: 4px solid white;
  border-left: 4px solid transparent;
  background: transparent;
  // width: 24px;
  // height: 24px;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
`

const Centering = styled(Flex)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const LoadingIndicator = ({ size = "24" }) => {
  return (
    <Centering>
      <Spinner size={size} />
    </Centering>
  )
}

export default LoadingIndicator