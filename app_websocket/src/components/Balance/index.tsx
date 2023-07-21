import React from 'react';
import './Balance.css';

interface BalanceProps {
  balance: number;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => {
  return (
    <div className="balance">
      <h2>Balance de la cuenta</h2>
      <p>${balance.toFixed(2)}</p>
    </div>
  );
};

export default Balance;
