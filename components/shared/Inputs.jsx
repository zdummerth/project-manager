import React, { useState } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  margin-bottom: 10px;
  width: 100%;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray};

`

const Label = styled.label`
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Input = ({ id, label, ...rest }) => {

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} {...rest} />
    </>
  )

}

export default Input