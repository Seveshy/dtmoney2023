import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionType {
  category: number;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: TransactionType[];
}

interface TransactionProviderProps {
  children: ReactNode;
}
export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProviderProps({
  children,
}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/transaction").then((response) =>
      response.json().then((data) => {
        setTransactions(data);
      })
    );
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
