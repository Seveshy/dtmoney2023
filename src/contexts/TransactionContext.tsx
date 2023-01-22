import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}
export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProviderProps({
  children,
}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
