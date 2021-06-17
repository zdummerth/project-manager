import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h2``

const Title = ({ children, className, ...rest }) => {
    return (
        <StyledTitle className={className} {...rest} >{children}</StyledTitle>
    )
}

export default Title