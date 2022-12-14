import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
     background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
`

const Button = ({text, onClick}) => {
  return (
    <StyledButton onClick={onClick}>{text}</StyledButton>
  )
}

export default Button