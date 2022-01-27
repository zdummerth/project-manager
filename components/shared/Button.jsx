import React from 'react'
import styled from 'styled-components'

const getColor = ({ cancel, remove, theme, outline }) => {
    if (cancel) return theme.colors.button.cancel
    if (remove) return theme.colors.button.remove
    if (outline) return 'transparent'
    return theme.colors.gradient
}

const StyledButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${getColor};
    // color: ${({ theme }) => theme.colors.button.color};
    color: inherit;
    border: ${({ outline, theme }) => outline ? `2px solid ${theme.colors.brand}` : 'none'};
    min-width: 70px;
    // height: 100%;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    // border: none;

    &:hover {
        cursor: pointer;
    }
`

const DisabledOverlay = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // border-radius: 50px;
    background: ${({ theme }) => theme.colors.button.disabled};
`

export const BlankButton = styled.button`
    border: none;
    background: transparent;
    color: inherit;
`

const Button = ({ children, disabled, ...rest }) => {
    return (
        <StyledButton disabled={disabled} {...rest} >
            {children}
            {disabled && <DisabledOverlay />}
        </StyledButton>
    )
}

export default Button