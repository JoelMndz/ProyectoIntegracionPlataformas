import { useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import Transactions from './components/Transactions';

const App = () => {
  const ENDPOINT = "http://localhost:81";
  const socket = io(ENDPOINT);
  const balance = 2500.35;

  const transactions = [
    { id: 1, description: 'Compra en tienda', amount: -100.5 },
    { id: 2, description: 'Transferencia entrante', amount: 500 },
    { id: 3, description: 'Pago de factura', amount: -200 },
    { id: 4, description: 'Salario', amount: 1000 },
    { id: 5, description: 'Retiro en cajero', amount: -50 },
    { id: 6, description: 'Pago de préstamo', amount: -350 },
    { id: 7, description: 'Depósito de cliente', amount: 200 },
  ];

  useEffect(() => {
    console.log('Conectando con el servidor...');
    socket.on('connect', () => {
      console.log('Cliente conectado al servidor!');
    });

    return () => {
      console.log('Desconectando del servidor...');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="dashboard">
        <Balance balance={balance} />
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
};

export default App;