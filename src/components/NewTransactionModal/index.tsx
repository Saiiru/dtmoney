import React, { FormEvent } from "react";

import ReactModal from "react-modal";
import {Container, TransactionTypeContainer, RadioBox } from './style'
import CloseImg from '../../assets/Close.svg'
import IncomeImg from "../../assets/Entradas.svg";
import OutcomeImg from "../../assets/Saidas.svg";
import { useTransactions } from "../../hooks/useTransactionContext";

interface TransactionModalProps {
  onNewTransactionModalClosed: () => void,
  isNewTransactionModalOpen: boolean
}


export  function NewTransactionModal({onNewTransactionModalClosed, isNewTransactionModalOpen}: TransactionModalProps) {
  const [type, setType] =  React.useState('deposit')
  const [title, setTitle] = React.useState("")
  const [amount, setAmount] = React.useState(0)
  const [category, setCategory] = React.useState("")
  const {createTransaction} = useTransactions()
 async function handleCreateNewTransaction(event:  FormEvent ) {
    event.preventDefault()
    await createTransaction({title, amount, type, category })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onNewTransactionModalClosed()
  }
  return (
      <ReactModal
       isOpen={isNewTransactionModalOpen}
       onRequestClose={onNewTransactionModalClosed}
       overlayClassName={"react-modal-overlay"}
       className={"react-modal-content"}
       >
         <button
          type="button"
          onClick={onNewTransactionModalClosed}
          className="react-modal-close">
          <img src={CloseImg} alt="Fechar Modal" 
           />
         </button> 
         <Container onSubmit={handleCreateNewTransaction} method="post">
           <h2>New Transaction</h2>

           <input type="text" placeholder="Tittle" value={title} onChange={event => setTitle(event.target.value)}/>
           <input type="number" placeholder="Number" value={amount} onChange={event => setAmount(Number(event.target.value))} />

            <TransactionTypeContainer>
              <RadioBox type="button" 
              onClick={()=> setType('deposit')}
              isActive={type === 'deposit'}
              activeColor="green"
              
              >
                <img src={IncomeImg} alt="Income"  />
                <span>Income</span>
              </RadioBox>
              <RadioBox type="button" 
              onClick={()=> setType('withdraw')}
              isActive={type === 'withdraw'}
              activeColor="red"
              >
                <img src={OutcomeImg} alt="Outcome" />
                <span>Withdraw</span>
              </RadioBox>
            </TransactionTypeContainer>

           <input placeholder="categoria" value={category} onChange={event => setCategory(event.target.value)}/>

           <button type="submit">Add</button>

         </Container>
        
      </ReactModal>
    
  )
}
