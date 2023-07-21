import React from 'react';
import './Transactions.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <div className="transactions">
      <h2>Últimas transacciones</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.description}</span>
            <span>${transaction.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
