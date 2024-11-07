import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Reports from './components/Reports';
import './App.css';

function App() {
  // Load clients from localStorage
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem('clients');
    return savedClients ? JSON.parse(savedClients) : [];
  });

  // Load monthly history from localStorage
  const [monthlyHistory, setMonthlyHistory] = useState(() => {
    const savedHistory = localStorage.getItem('monthlyHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [totalSales, setTotalSales] = useState(0);
  const [totalCancellations, setTotalCancellations] = useState(0);
  const [cancelledClientsCount, setCancelledClientsCount] = useState(0);

  // Check for month change and reset
  useEffect(() => {
    const checkAndResetMonth = () => {
      const currentDate = new Date();
      const lastResetDate = localStorage.getItem('lastResetDate');
      
      if (!lastResetDate || !isSameMonth(new Date(lastResetDate), currentDate)) {
        const monthData = {
          month: new Date(lastResetDate || Date.now()).toLocaleString('he-IL', { month: 'long', year: 'numeric' }),
          totalSales,
          totalCancellations,
          cancelledClientsCount,
          clientCount: clients.filter(client => client.status === 'active').length
        };
        
        setMonthlyHistory(prev => [monthData, ...prev].slice(0, 12));
        
        const activeClients = clients.filter(client => client.status !== 'cancelled');
        setClients(activeClients.map(client => ({
          ...client,
          amount: '0'
        })));
        
        localStorage.setItem('lastResetDate', currentDate.toISOString());
        setTimeout(updateCurrentMonthData, 0);
      }
    };

    checkAndResetMonth();
    const dailyCheck = setInterval(checkAndResetMonth, 1000 * 60 * 60 * 24);
    return () => clearInterval(dailyCheck);
  }, [clients, totalSales, totalCancellations, cancelledClientsCount]);

  useEffect(() => {
    localStorage.setItem('monthlyHistory', JSON.stringify(monthlyHistory));
  }, [monthlyHistory]);

  useEffect(() => {
    const activeClients = clients.filter(client => client.status !== 'cancelled');
    const cancelledClients = clients.filter(client => client.status === 'cancelled');
    
    const activeSales = activeClients.reduce((sum, client) => sum + Number(client.amount), 0);
    const cancelledAmount = cancelledClients.reduce((sum, client) => sum + Number(client.amount), 0);
    
    setTotalSales(activeSales);
    setTotalCancellations(cancelledAmount);
    setCancelledClientsCount(cancelledClients.length);
    localStorage.setItem('clients', JSON.stringify(clients));

    // Update current month data whenever clients change
    updateCurrentMonthData();
  }, [clients]);

  const handleAddClient = (newClient) => {
    setClients([...clients, { ...newClient, id: Date.now() }]);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleEditClient = (updatedClient) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  const updateCurrentMonthData = () => {
    const activeClients = clients.filter(client => client.status === 'active');
    const cancelledClients = clients.filter(client => client.status === 'cancelled');
    const currentDate = new Date();
    
    const activeSales = activeClients.reduce((sum, client) => sum + Number(client.amount), 0);
    const cancelledAmount = cancelledClients.reduce((sum, client) => sum + Number(client.amount), 0);
    
    const currentMonthData = {
      month: currentDate.toLocaleString('he-IL', { month: 'long', year: 'numeric' }),
      totalSales: activeSales,
      totalCancellations: cancelledAmount,
      cancelledClientsCount: cancelledClients.length,
      clientCount: activeClients.length
    };

    setMonthlyHistory(prev => {
      if (prev.length === 0) return [currentMonthData];
      const updatedHistory = [...prev];
      updatedHistory[0] = currentMonthData;
      return updatedHistory;
    });
  };

  const isSameMonth = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && 
           date1.getMonth() === date2.getMonth();
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                clients={clients}
                totalSales={totalSales}
                totalCancellations={totalCancellations}
                cancelledClientsCount={cancelledClientsCount}
                monthlyHistory={monthlyHistory}
                onAddClient={handleAddClient}
                onDeleteClient={handleDeleteClient}
                onEditClient={handleEditClient}
              />
            } 
          />
          <Route 
            path="/clients" 
            element={
              <Clients 
                clients={clients}
                onDeleteClient={handleDeleteClient}
                onEditClient={handleEditClient}
              />
            } 
          />
          <Route 
            path="/reports" 
            element={
              <Reports 
                clients={clients}
                monthlyHistory={monthlyHistory}
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;