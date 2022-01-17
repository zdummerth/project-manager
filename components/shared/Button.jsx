import React from 'react'
import styled from 'styled-components'

const getColor = ({ cancel, remove, theme }) => {
    if(cancel) return theme.colors.button.cancel
    if(remove) return theme.colors.button.remove
    return theme.colors.gradient
}

const StyledButton = styled.button`
    position: relative;
    background: ${getColor};
    color: ${({ theme }) => theme.colors.button.color};
    border: ${({ cancel }) => cancel ? `2px solid gray` : 'none'};
    min-width: 70px;
    height: 40px;
    text-align: center;
    padding: 10px;
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

const Button = ({ children, disabled, onClick, ...rest }) => {
    return (
        <StyledButton disabled={disabled} onClick={onClick} {...rest} >
            {children}
            {disabled && <DisabledOverlay />}
        </StyledButton>
    )
}

export default Button