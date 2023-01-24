import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface TransactionType {
  category: number;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  type: "income" | "outcome";
}
interface CreateTransactionType {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}
interface TransactionContextType {
  transactions: TransactionType[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionType) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProviderProps({
  children,
}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionType) => {
    const { category, description, price, type } = data;

    const response = await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
