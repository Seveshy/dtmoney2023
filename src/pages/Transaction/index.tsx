import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionTable,
} from "./styles";

interface TransactionType {
  category: number;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  type: "income" | "outcome";
}

export function Transactions() {
  const [transaction, setTransaction] = useState<TransactionType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/transaction").then((response) =>
      response.json().then((data) => {
        setTransaction(data);
      })
    );
  }, []);

  return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transaction.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
}
