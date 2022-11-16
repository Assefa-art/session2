import './App.css';
import UserContextProvider from './context/UserContext';
import CreateUser from './pages/CreateUser';
import UsersList from './pages/UsersList';
import UpdateUser from './pages/UpdateUser';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

const HomePage = () => {
  return <UserContextProvider>
  <UsersList />
  <CreateUser />
  <UpdateUser/>
</UserContextProvider>
}

function App() {


  return (
    <div className="App">
  
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/users' element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
