import React, { useState } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px;
  border: none;
`

const Label = styled.label`
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Input = ({ id, label, error, ...rest }) => {

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <div style={{
        marginTop: '10px',
        marginBottom: '5px',
        height: '14px',
        color: "red",
        fontSize: '14px'
      }}>
        {error && error}
      </div>
      <StyledInput id={id} {...rest} />
    </>
  )

}

export default Input