import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteList from './pages/ClientList';
import ClienteForm from './pages/ClientForm';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/cadastro" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />
      </Routes>
    </Router>
  );
}


export default App;