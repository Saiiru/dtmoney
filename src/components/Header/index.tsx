import React from 'react'
import Logo from '../../assets/Logo.svg'
import { Container,Content } from './style'

interface HeaderProps {
  onOpenNewTransactionModal: () => void
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {
 
  return (
    <Container>
      <Content>
      <img src={Logo} alt="dt money" />
      <button type='button' onClick={onOpenNewTransactionModal}>
        Nova Transação
      </button>

      
      </Content>
    </Container>
  )
}


