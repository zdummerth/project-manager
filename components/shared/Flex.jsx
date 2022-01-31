import React from 'react'
import styled from 'styled-components'

const Flexbox = styled.div`
    display: flex;
    flex-direction: ${({ dir }) => dir ? dir : 'row'};
    flex: ${({ flex }) => flex ? flex : '0 1 auto'};
    // flex-wrap: wrap;
    flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'no-wrap'};
    justify-content: ${({ jc }) => jc ? jc : 'flex-start'};
    align-items: ${({ ai }) => ai ? ai : 'flex-start'};
`

const Flex = ({ children, className, ...rest }) => {
    return (
        <Flexbox className={className} {...rest} >{children}</Flexbox>
    )
}

export default Flex