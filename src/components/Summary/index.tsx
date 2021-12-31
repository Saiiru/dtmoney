import React from "react";
import { Container } from "./style";

import IncomeImg from "../../assets/Entradas.svg";
import OutcomeImg from "../../assets/Saidas.svg";
import TotalImg from "../../assets/Total.svg";
import { useTransactions } from "../../hooks/useTransactionContext";

export function Summary() {
  const {transactions} = useTransactions()

 

  const summary = transactions.reduce((acc, transaction)=>{
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount;
    }
    return acc
  }, {deposits: 0, withdraws: 0, total: 0})
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeImg} alt="Bola verde com uma flecha no meio" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={OutcomeImg} alt="Bola vermelha com uma flecha no meio" />
        </header>
        <strong>-{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.withdraws)}</strong>
      </div>
      <div className="background">
        <header>
          <p>Total</p>
          <img src={TotalImg} alt="Bola verde com uma flecha no meio" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.total)}</strong>
      </div>
    </Container>
  );
}
