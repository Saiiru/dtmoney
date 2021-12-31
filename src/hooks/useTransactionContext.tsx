import React, { ReactNode } from 'react';
import { api } from '../services/api';



interface Transaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TranasctionContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export const transactionContext = React.createContext<TranasctionContextData>({} as TranasctionContextData)


export function TransactionProvider({children}: TransactionsProviderProps) {
  const [ transactions, setTransactions] = React.useState<Transaction[]>([])
  React.useEffect(() => {
    api.get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);


  async function createTransaction(transactionInput: TransactionInput){
    
  const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()})
  const {transaction} = response.data;

  setTransactions([...transactions, transaction])
  }
return (
  <transactionContext.Provider value={{transactions, createTransaction}}>
    {children}
  </transactionContext.Provider>
)
}

export function useTransactions(){
  const context = React.useContext(transactionContext)

  return context
}